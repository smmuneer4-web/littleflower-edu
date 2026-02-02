import requests
import sys
import json
from datetime import datetime

class AdmissionAPITester:
    def __init__(self, base_url="https://littleflower-edu.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.created_application_id = None

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json() if response.content else {}
                    if response_data:
                        print(f"   Response keys: {list(response_data.keys()) if isinstance(response_data, dict) else 'List with ' + str(len(response_data)) + ' items'}")
                except:
                    print(f"   Response: Non-JSON content (length: {len(response.content)})")
                    response_data = {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_detail = response.json()
                    print(f"   Error: {error_detail}")
                except:
                    print(f"   Error: {response.text[:200]}")
                response_data = {}

            return success, response_data

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_create_admission_application(self):
        """Test creating a new admission application"""
        test_data = {
            # Required fields
            "fullName": "John Doe Test",
            "mobileNumber": "9876543210",
            "email": "john.doe.test@example.com",
            "college": "Little Flower College of Nursing",
            "course": "B.Sc Nursing",
            
            # Optional fields
            "whatsappNumber": "9876543210",
            "dateOfBirth": "1995-05-15",
            "gender": "Male",
            "aadhaarNumber": "123456789012",
            "religion": "Hindu",
            "fatherName": "Robert Doe",
            "parentNumber": "9876543211",
            "motherName": "Mary Doe",
            "motherNumber": "9876543212",
            "state": "Karnataka",
            "district": "Bangalore",
            "pincode": "560056",
            "address": "123 Test Street, Bangalore",
            
            # Academic details
            "registerNumber": "12345678",
            "stream": "Science",
            "schoolName": "Test High School",
            "schoolPlace": "Bangalore",
            "lastQualification": "+2/PUC",
            "markPercentage": "85.5",
            
            # Reference
            "referenceConsultancyName": "Test Consultancy"
        }
        
        success, response = self.run_test(
            "Create Admission Application",
            "POST",
            "admissions",
            201,
            data=test_data
        )
        
        if success and 'id' in response:
            self.created_application_id = response['id']
            print(f"   Created application ID: {self.created_application_id}")
            return True
        return False

    def test_get_all_applications(self):
        """Test fetching all admission applications"""
        success, response = self.run_test(
            "Get All Applications",
            "GET",
            "admissions",
            200
        )
        
        if success and isinstance(response, list):
            print(f"   Found {len(response)} applications")
            return True
        return False

    def test_get_specific_application(self):
        """Test fetching a specific admission application"""
        if not self.created_application_id:
            print("❌ Skipping - No application ID available")
            return False
            
        success, response = self.run_test(
            "Get Specific Application",
            "GET",
            f"admissions/{self.created_application_id}",
            200
        )
        
        if success and response.get('id') == self.created_application_id:
            print(f"   Retrieved application for: {response.get('fullName', 'Unknown')}")
            return True
        return False

    def test_download_application_pdf(self):
        """Test PDF download functionality"""
        if not self.created_application_id:
            print("❌ Skipping - No application ID available")
            return False
            
        url = f"{self.api_url}/admissions/{self.created_application_id}/download"
        print(f"\n🔍 Testing Download Application PDF...")
        print(f"   URL: {url}")
        
        self.tests_run += 1
        
        try:
            response = requests.get(url)
            
            if response.status_code == 200:
                content_type = response.headers.get('content-type', '')
                content_length = len(response.content)
                
                if 'application/pdf' in content_type and content_length > 1000:
                    self.tests_passed += 1
                    print(f"✅ Passed - PDF generated successfully")
                    print(f"   Content-Type: {content_type}")
                    print(f"   Content-Length: {content_length} bytes")
                    return True
                else:
                    print(f"❌ Failed - Invalid PDF response")
                    print(f"   Content-Type: {content_type}")
                    print(f"   Content-Length: {content_length} bytes")
            else:
                print(f"❌ Failed - Status: {response.status_code}")
                try:
                    error_detail = response.json()
                    print(f"   Error: {error_detail}")
                except:
                    print(f"   Error: {response.text[:200]}")
                    
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            
        return False

    def test_invalid_application_id(self):
        """Test fetching non-existent application"""
        success, response = self.run_test(
            "Get Non-existent Application",
            "GET",
            "admissions/invalid-id-12345",
            404
        )
        return success

    def test_invalid_form_data(self):
        """Test submitting invalid form data"""
        invalid_data = {
            "fullName": "",  # Empty required field
            "email": "invalid-email",  # Invalid email
            "mobileNumber": "123"  # Invalid phone
        }
        
        success, response = self.run_test(
            "Submit Invalid Form Data",
            "POST",
            "admissions",
            422,  # Validation error
            data=invalid_data
        )
        return success

def main():
    print("🚀 Starting Little Flower Admission API Tests")
    print("=" * 60)
    
    tester = AdmissionAPITester()
    
    # Test sequence
    tests = [
        ("Create Application", tester.test_create_admission_application),
        ("Get All Applications", tester.test_get_all_applications),
        ("Get Specific Application", tester.test_get_specific_application),
        ("Download PDF", tester.test_download_application_pdf),
        ("Invalid Application ID", tester.test_invalid_application_id),
        ("Invalid Form Data", tester.test_invalid_form_data),
    ]
    
    for test_name, test_func in tests:
        try:
            test_func()
        except Exception as e:
            print(f"❌ {test_name} failed with exception: {str(e)}")
    
    # Print summary
    print("\n" + "=" * 60)
    print(f"📊 Test Summary:")
    print(f"   Tests Run: {tester.tests_run}")
    print(f"   Tests Passed: {tester.tests_passed}")
    print(f"   Success Rate: {(tester.tests_passed/tester.tests_run*100):.1f}%" if tester.tests_run > 0 else "No tests run")
    
    if tester.created_application_id:
        print(f"\n📋 Created Application ID: {tester.created_application_id}")
        print(f"   PDF Download URL: {tester.api_url}/admissions/{tester.created_application_id}/download")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())