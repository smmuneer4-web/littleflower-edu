from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from fastapi.responses import StreamingResponse
import io
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Admission Application Models
class AdmissionApplication(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    # Candidate Information
    fullName: str
    mobileNumber: str
    email: EmailStr
    college: str
    course: str
    # Personal Details
    whatsappNumber: Optional[str] = None
    dateOfBirth: Optional[str] = None
    gender: Optional[str] = None
    aadhaarNumber: Optional[str] = None
    religion: Optional[str] = None
    fatherName: Optional[str] = None
    parentNumber: Optional[str] = None
    motherName: Optional[str] = None
    motherNumber: Optional[str] = None
    state: Optional[str] = None
    district: Optional[str] = None
    pincode: Optional[str] = None
    address: Optional[str] = None
    # Academic Details
    registerNumber: Optional[str] = None
    stream: Optional[str] = None
    schoolName: Optional[str] = None
    schoolPlace: Optional[str] = None
    lastQualification: Optional[str] = None
    markPercentage: Optional[str] = None
    # Reference Information
    referenceConsultancyName: Optional[str] = None
    # Metadata
    submittedAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "pending"

class AdmissionApplicationCreate(BaseModel):
    # Candidate Information
    fullName: str
    mobileNumber: str
    email: EmailStr
    college: str
    course: str
    # Personal Details
    whatsappNumber: Optional[str] = None
    dateOfBirth: Optional[str] = None
    gender: Optional[str] = None
    aadhaarNumber: Optional[str] = None
    religion: Optional[str] = None
    fatherName: Optional[str] = None
    parentNumber: Optional[str] = None
    motherName: Optional[str] = None
    motherNumber: Optional[str] = None
    state: Optional[str] = None
    district: Optional[str] = None
    pincode: Optional[str] = None
    address: Optional[str] = None
    # Academic Details
    registerNumber: Optional[str] = None
    stream: Optional[str] = None
    schoolName: Optional[str] = None
    schoolPlace: Optional[str] = None
    lastQualification: Optional[str] = None
    markPercentage: Optional[str] = None
    # Reference Information
    referenceConsultancyName: Optional[str] = None

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Helper function to send email notification
async def send_email_notification(application_data: dict):
    """Send email notification when a new application is submitted"""
    try:
        # Email configuration
        smtp_server = os.environ.get('SMTP_SERVER', 'smtp.gmail.com')
        smtp_port = int(os.environ.get('SMTP_PORT', '587'))
        sender_email = os.environ.get('SENDER_EMAIL', 'info@littleflowerinstitutions.in')
        sender_password = os.environ.get('SENDER_PASSWORD', '')
        receiver_email = os.environ.get('ADMIN_EMAIL', 'info@littleflowerinstitutions.in')
        
        # Skip email if no password is configured
        if not sender_password:
            logger.warning("Email notification skipped: SENDER_PASSWORD not configured")
            return
        
        # Create message
        message = MIMEMultipart()
        message['From'] = sender_email
        message['To'] = receiver_email
        message['Subject'] = f"New Admission Application - {application_data['fullName']}"
        
        # Email body
        body = f"""
New Admission Application Received

Candidate Information:
- Full Name: {application_data['fullName']}
- Mobile: {application_data['mobileNumber']}
- Email: {application_data['email']}
- College: {application_data['college']}
- Course: {application_data['course']}

Application ID: {application_data['id']}
Submitted At: {application_data['submittedAt']}

Please log in to review the full application.
"""
        
        message.attach(MIMEText(body, 'plain'))
        
        # Send email
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.send_message(message)
        
        logger.info(f"Email notification sent for application {application_data['id']}")
    except Exception as e:
        logger.error(f"Failed to send email notification: {str(e)}")

# Admission Application Endpoints
@api_router.post("/admissions", response_model=AdmissionApplication, status_code=201)
async def create_admission_application(application: AdmissionApplicationCreate):
    """Submit a new admission application"""
    try:
        # Convert to dict and create application object
        app_dict = application.model_dump()
        app_obj = AdmissionApplication(**app_dict)
        
        # Serialize for MongoDB
        doc = app_obj.model_dump()
        doc['submittedAt'] = doc['submittedAt'].isoformat()
        
        # Insert into database
        result = await db.admission_applications.insert_one(doc)
        
        if result.inserted_id:
            # Send email notification (don't wait for it)
            try:
                await send_email_notification(app_obj.model_dump())
            except Exception as e:
                logger.error(f"Email notification failed but application saved: {str(e)}")
            
            logger.info(f"New admission application created: {app_obj.id}")
            return app_obj
        else:
            raise HTTPException(status_code=500, detail="Failed to create application")
    except Exception as e:
        logger.error(f"Error creating admission application: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/admissions", response_model=List[AdmissionApplication])
async def get_admission_applications(limit: int = 100, skip: int = 0):
    """Get all admission applications (admin endpoint)"""
    try:
        applications = await db.admission_applications.find({}, {"_id": 0}).skip(skip).limit(limit).to_list(limit)
        
        # Convert ISO string timestamps back to datetime
        for app in applications:
            if isinstance(app.get('submittedAt'), str):
                app['submittedAt'] = datetime.fromisoformat(app['submittedAt'])
        
        return applications
    except Exception as e:
        logger.error(f"Error fetching applications: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/admissions/{application_id}", response_model=AdmissionApplication)
async def get_admission_application(application_id: str):
    """Get a specific admission application"""
    try:
        application = await db.admission_applications.find_one({"id": application_id}, {"_id": 0})
        if not application:
            raise HTTPException(status_code=404, detail="Application not found")
        
        # Convert ISO string timestamp back to datetime
        if isinstance(application.get('submittedAt'), str):
            application['submittedAt'] = datetime.fromisoformat(application['submittedAt'])
        
        return AdmissionApplication(**application)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching application: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/admissions/{application_id}/download")
async def download_admission_application(application_id: str):
    """Download admission application as PDF"""
    try:
        # Fetch application from database
        application = await db.admission_applications.find_one({"id": application_id}, {"_id": 0})
        if not application:
            raise HTTPException(status_code=404, detail="Application not found")
        
        # Create PDF in memory
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=A4, topMargin=0.5*inch, bottomMargin=0.5*inch)
        
        # Container for PDF elements
        elements = []
        styles = getSampleStyleSheet()
        
        # Custom styles
        title_style = ParagraphStyle(
            'CustomTitle',
            parent=styles['Heading1'],
            fontSize=18,
            textColor=colors.HexColor('#2d3589'),
            spaceAfter=12,
            alignment=TA_CENTER,
            fontName='Helvetica-Bold'
        )
        
        heading_style = ParagraphStyle(
            'CustomHeading',
            parent=styles['Heading2'],
            fontSize=14,
            textColor=colors.HexColor('#2d3589'),
            spaceAfter=8,
            spaceBefore=12,
            fontName='Helvetica-Bold'
        )
        
        # Title
        elements.append(Paragraph("LITTLE FLOWER GROUP OF INSTITUTIONS", title_style))
        elements.append(Paragraph("Admission Application Form", styles['Heading2']))
        elements.append(Spacer(1, 0.2*inch))
        
        # Application ID and Date
        submitted_date = application.get('submittedAt', 'N/A')
        if isinstance(submitted_date, str):
            try:
                submitted_date = datetime.fromisoformat(submitted_date).strftime('%d-%m-%Y %H:%M')
            except:
                pass
        
        info_data = [
            ['Application ID:', application['id']],
            ['Submitted Date:', str(submitted_date)],
            ['Status:', application.get('status', 'pending').upper()]
        ]
        info_table = Table(info_data, colWidths=[2*inch, 4*inch])
        info_table.setStyle(TableStyle([
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ]))
        elements.append(info_table)
        elements.append(Spacer(1, 0.2*inch))
        
        # Candidate Information
        elements.append(Paragraph("CANDIDATE INFORMATION", heading_style))
        candidate_data = [
            ['Full Name:', application.get('fullName', 'N/A')],
            ['Mobile Number:', application.get('mobileNumber', 'N/A')],
            ['Email:', application.get('email', 'N/A')],
            ['College:', application.get('college', 'N/A')],
            ['Course:', application.get('course', 'N/A')],
        ]
        candidate_table = Table(candidate_data, colWidths=[2*inch, 4*inch])
        candidate_table.setStyle(TableStyle([
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
        ]))
        elements.append(candidate_table)
        elements.append(Spacer(1, 0.15*inch))
        
        # Personal Details
        elements.append(Paragraph("PERSONAL DETAILS", heading_style))
        personal_data = [
            ['WhatsApp Number:', application.get('whatsappNumber', 'N/A')],
            ['Date of Birth:', application.get('dateOfBirth', 'N/A')],
            ['Gender:', application.get('gender', 'N/A')],
            ['Aadhaar Number:', application.get('aadhaarNumber', 'N/A')],
            ['Religion:', application.get('religion', 'N/A')],
            ["Father's Name:", application.get('fatherName', 'N/A')],
            ["Parent's Number:", application.get('parentNumber', 'N/A')],
            ["Mother's Name:", application.get('motherName', 'N/A')],
            ["Mother's Number:", application.get('motherNumber', 'N/A')],
            ['State:', application.get('state', 'N/A')],
            ['District:', application.get('district', 'N/A')],
            ['Pincode:', application.get('pincode', 'N/A')],
            ['Address:', application.get('address', 'N/A')],
        ]
        personal_table = Table(personal_data, colWidths=[2*inch, 4*inch])
        personal_table.setStyle(TableStyle([
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
        ]))
        elements.append(personal_table)
        elements.append(Spacer(1, 0.15*inch))
        
        # Academic Details
        elements.append(Paragraph("ACADEMIC DETAILS", heading_style))
        academic_data = [
            ['+2 Register Number:', application.get('registerNumber', 'N/A')],
            ['Stream:', application.get('stream', 'N/A')],
            ['+2 School Name:', application.get('schoolName', 'N/A')],
            ['School Place:', application.get('schoolPlace', 'N/A')],
            ['Last Qualification:', application.get('lastQualification', 'N/A')],
            ['Mark Percentage:', application.get('markPercentage', 'N/A')],
        ]
        academic_table = Table(academic_data, colWidths=[2*inch, 4*inch])
        academic_table.setStyle(TableStyle([
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
        ]))
        elements.append(academic_table)
        elements.append(Spacer(1, 0.15*inch))
        
        # Reference Information
        elements.append(Paragraph("REFERENCE INFORMATION", heading_style))
        reference_data = [
            ['Reference/Consultancy Name:', application.get('referenceConsultancyName', 'N/A')],
        ]
        reference_table = Table(reference_data, colWidths=[2*inch, 4*inch])
        reference_table.setStyle(TableStyle([
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
        ]))
        elements.append(reference_table)
        elements.append(Spacer(1, 0.3*inch))
        
        # Footer
        footer_text = "This is a computer-generated document. For any queries, please contact info@littleflowerinstitutions.in"
        elements.append(Paragraph(footer_text, styles['Normal']))
        
        # Build PDF
        doc.build(elements)
        buffer.seek(0)
        
        # Return as streaming response
        return StreamingResponse(
            buffer,
            media_type="application/pdf",
            headers={
                "Content-Disposition": f"attachment; filename=admission_application_{application_id}.pdf"
            }
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error generating PDF: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to generate PDF: {str(e)}")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()