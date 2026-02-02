import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { courseOptions } from '../data/mockData';
import { useToast } from '../hooks/use-toast';
import { Loader2 } from 'lucide-react';

const AdmissionFormModal = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Candidate Information
    fullName: '',
    mobileNumber: '',
    email: '',
    college: '',
    course: '',
    
    // Personal Details
    whatsappNumber: '',
    dateOfBirth: '',
    gender: '',
    aadhaarNumber: '',
    religion: '',
    fatherName: '',
    parentNumber: '',
    motherName: '',
    motherNumber: '',
    state: '',
    district: '',
    pincode: '',
    address: '',
    
    // Academic Details
    registerNumber: '',
    stream: '',
    schoolName: '',
    schoolPlace: '',
    lastQualification: '',
    markPercentage: '',
    
    // Reference Information
    referenceConsultancyName: ''
  });

  const colleges = [
    "Little Flower College of Nursing",
    "Little Flower Institute of Allied Health Sciences",
    "Little Flower College of Pharmacy",
    "Little Flower College of Physiotherapy",
    "Sree Venketeshwara School of Nursing",
    "D.R Vijayakumari School of Nursing",
    "S V College of Nursing"
  ];

  const genders = ["Male", "Female", "Other"];
  const religions = ["Hindu", "Muslim", "Christian", "Sikh", "Buddhist", "Jain", "Other"];
  const qualifications = ["SSLC", "+2/PUC", "Diploma", "Graduate", "Post Graduate"];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.mobileNumber || !formData.college || !formData.course) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields in Candidate Information section.",
        variant: "destructive"
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.mobileNumber)) {
      toast({
        title: "Invalid Mobile Number",
        description: "Please enter a valid 10-digit mobile number.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      
      toast({
        title: "Application Submitted Successfully!",
        description: "We'll contact you shortly with further details.",
      });

      // Reset form
      setFormData({
        fullName: '',
        mobileNumber: '',
        email: '',
        college: '',
        course: '',
        whatsappNumber: '',
        dateOfBirth: '',
        gender: '',
        aadhaarNumber: '',
        religion: '',
        fatherName: '',
        parentNumber: '',
        motherName: '',
        motherNumber: '',
        state: '',
        district: '',
        pincode: '',
        address: '',
        registerNumber: '',
        stream: '',
        schoolName: '',
        schoolPlace: '',
        lastQualification: '',
        markPercentage: '',
        referenceConsultancyName: ''
      });
      
      setIsSubmitting(false);
      onOpenChange(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Start Your Journey with Little Flower
          </DialogTitle>
          <DialogDescription>
            Fill in your details and we'll get back to you with admission information.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8 mt-4">
          {/* Candidate Information */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-bold text-[#2d3589] mb-4">Candidate Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-gray-700 font-medium">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  placeholder="Enter candidate's full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="border-gray-300 focus:border-[#2d3589] focus:ring-[#2d3589]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobileNumber" className="text-gray-700 font-medium">
                  Mobile Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="mobileNumber"
                  type="tel"
                  placeholder="Enter 10-digit number"
                  value={formData.mobileNumber}
                  onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                  className="border-gray-300 focus:border-[#2d3589] focus:ring-[#2d3589]"
                  maxLength={10}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="candidate@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="border-gray-300 focus:border-[#2d3589] focus:ring-[#2d3589]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="college" className="text-gray-700 font-medium">
                  College <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.college} onValueChange={(value) => handleInputChange('college', value)}>
                  <SelectTrigger className="border-gray-300 focus:border-[#2d3589] focus:ring-[#2d3589]">
                    <SelectValue placeholder="Select College" />
                  </SelectTrigger>
                  <SelectContent>
                    {colleges.map((college) => (
                      <SelectItem key={college} value={college}>
                        {college}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="course" className="text-gray-700 font-medium">
                  Course <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.course} onValueChange={(value) => handleInputChange('course', value)}>
                  <SelectTrigger className="border-gray-300 focus:border-[#2d3589] focus:ring-[#2d3589]">
                    <SelectValue placeholder="Select Course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courseOptions.map((course) => (
                      <SelectItem key={course} value={course}>
                        {course}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Personal Details */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-bold text-[#2d3589] mb-4">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="whatsappNumber" className="text-gray-700 font-medium">
                  WhatsApp Number
                </Label>
                <Input
                  id="whatsappNumber"
                  type="tel"
                  placeholder="Enter WhatsApp number"
                  value={formData.whatsappNumber}
                  onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                  className="border-gray-300 focus:border-[#2d3589] focus:ring-[#2d3589]"
                  maxLength={10}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className="text-gray-700 font-medium">
                  Date of Birth
                </Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="border-gray-300 focus:border-[#2d3589] focus:ring-[#2d3589]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender" className="text-gray-700 font-medium">
                  Gender
                </Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger className="border-gray-300 focus:border-[#2d3589] focus:ring-[#2d3589]">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {genders.map((gender) => (
                      <SelectItem key={gender} value={gender}>
                        {gender}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="aadhaarNumber" className="text-gray-700 font-medium">
                  Aadhaar Number
                </Label>
                <Input
                  id="aadhaarNumber"
                  placeholder="Enter 12-digit Aadhaar number"
                  value={formData.aadhaarNumber}
                  onChange={(e) => handleInputChange('aadhaarNumber', e.target.value)}
                  className="border-gray-300 focus:border-[#2d3589] focus:ring-[#2d3589]"
                  maxLength={12}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="religion" className="text-gray-700 font-medium">
                  Religion
                </Label>
                <Select value={formData.religion} onValueChange={(value) => handleInputChange('religion', value)}>
                  <SelectTrigger className="border-gray-300 focus:border-[#2d3589] focus:ring-[#2d3589]">
                    <SelectValue placeholder="Select Religion" />
                  </SelectTrigger>
                  <SelectContent>
                    {religions.map((religion) => (
                      <SelectItem key={religion} value={religion}>
                        {religion}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fatherName" className="text-gray-700 font-medium">
                  Father's Name
                </Label>
                <Input
                  id="fatherName"
                  placeholder="Enter father's name"
                  value={formData.fatherName}
                  onChange={(e) => handleInputChange('fatherName', e.target.value)}
                  className="border-gray-300 focus:border-[#2d3589] focus:ring-[#2d3589]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="parentNumber" className="text-gray-700 font-medium">
                  Parent's Number
                </Label>
                <Input
                  id="parentNumber"
                  type="tel"
                  placeholder="Enter parent's number"
                  value={formData.parentNumber}
                  onChange={(e) => handleInputChange('parentNumber', e.target.value)}
                  className="border-gray-300 focus:border-[#2d3589] focus:ring-[#2d3589]"
                  maxLength={10}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="motherName" className="text-gray-700 font-medium">
                  Mother's Name
                </Label>
                <Input
                  id="motherName"
                  placeholder="Enter mother's name"
                  value={formData.motherName}
                  onChange={(e) => handleInputChange('motherName', e.target.value)}
                  className="border-gray-300 focus:border-[#2d3589] focus:ring-[#2d3589]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="motherNumber" className="text-gray-700 font-medium">
                  Mother's Number
                </Label>
                <Input
                  id="motherNumber"
                  type="tel"
                  placeholder="Enter mother's number"
                  value={formData.motherNumber}
                  onChange={(e) => handleInputChange('motherNumber', e.target.value)}
                  className="border-gray-300 focus:border-[#2d3589] focus:ring-[#2d3589]"
                  maxLength={10}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state" className="text-gray-700 font-medium">
                  State
                </Label>
                <Input
                  id="state"
                  placeholder="Enter state"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="border-gray-300 focus:border-[#2d3589] focus:ring-[#2d3589]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="district" className="text-gray-700 font-medium">
                  District
                </Label>
                <Input
                  id="district"
                  placeholder="Enter district"
                  value={formData.district}
                  onChange={(e) => handleInputChange('district', e.target.value)}
                  className="border-gray-300 focus:border-[#2d3589] focus:ring-[#2d3589]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pincode" className="text-gray-700 font-medium">
                  Pincode
                </Label>
                <Input
                  id="pincode"
                  placeholder="Enter pincode"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange('pincode', e.target.value)}
                  className="border-gray-300 focus:border-[#2d3589] focus:ring-[#2d3589]"
                  maxLength={6}
                />
              </div>

              <div className="space-y-2 md:col-span-3">
                <Label htmlFor="address" className="text-gray-700 font-medium">
                  Address
                </Label>
                <Textarea
                  id="address"
                  placeholder="Enter full address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="border-gray-300 focus:border-[#2d3589] focus:ring-[#2d3589] min-h-[80px]"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Academic Details */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-bold text-[#2d3589] mb-4">Academic Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="registerNumber" className="text-gray-700 font-medium">
                  +2 Register Number
                </Label>
                <Input
                  id="registerNumber"
                  placeholder="Enter register number"
                  value={formData.registerNumber}
                  onChange={(e) => handleInputChange('registerNumber', e.target.value)}
                  className="border-gray-300 focus:border-[#2d3589] focus:ring-[#2d3589]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stream" className="text-gray-700 font-medium">
                  Stream
                </Label>
                <Input
                  id="stream"
                  placeholder="Enter your stream"
                  value={formData.stream}
                  onChange={(e) => handleInputChange('stream', e.target.value)}
                  className="border-gray-300 focus:border-[#2d3589] focus:ring-[#2d3589]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="schoolName" className="text-gray-700 font-medium">
                  +2 School Name
                </Label>
                <Input
                  id="schoolName"
                  placeholder="Enter school name"
                  value={formData.schoolName}
                  onChange={(e) => handleInputChange('schoolName', e.target.value)}
                  className="border-gray-300 focus:border-[#2d3589] focus:ring-[#2d3589]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="schoolPlace" className="text-gray-700 font-medium">
                  School Place
                </Label>
                <Input
                  id="schoolPlace"
                  placeholder="Enter school place"
                  value={formData.schoolPlace}
                  onChange={(e) => handleInputChange('schoolPlace', e.target.value)}
                  className="border-gray-300 focus:border-[#2d3589] focus:ring-[#2d3589]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastQualification" className="text-gray-700 font-medium">
                  Last Qualification
                </Label>
                <Select value={formData.lastQualification} onValueChange={(value) => handleInputChange('lastQualification', value)}>
                  <SelectTrigger className="border-gray-300 focus:border-[#2d3589] focus:ring-[#2d3589]">
                    <SelectValue placeholder="Select Qualification" />
                  </SelectTrigger>
                  <SelectContent>
                    {qualifications.map((qual) => (
                      <SelectItem key={qual} value={qual}>
                        {qual}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="markPercentage" className="text-gray-700 font-medium">
                  Mark Percentage
                </Label>
                <Input
                  id="markPercentage"
                  placeholder="Enter mark percentage"
                  value={formData.markPercentage}
                  onChange={(e) => handleInputChange('markPercentage', e.target.value)}
                  className="border-gray-300 focus:border-[#2d3589] focus:ring-[#2d3589]"
                />
              </div>
            </div>
          </div>

          {/* Reference Information */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-bold text-[#2d3589] mb-4">Reference Information</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="referenceConsultancyName" className="text-gray-700 font-medium">
                  Reference/Consultancy Name
                </Label>
                <Input
                  id="referenceConsultancyName"
                  placeholder="Enter reference or consultancy name"
                  value={formData.referenceConsultancyName}
                  onChange={(e) => handleInputChange('referenceConsultancyName', e.target.value)}
                  className="border-gray-300 focus:border-[#2d3589] focus:ring-[#2d3589]"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#2d3589] hover:bg-[#232a6b] text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className="border-gray-300"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdmissionFormModal;
