"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { PreferredCitySelect } from "@/components/preferred-city-select"
import {
  ChevronLeft,
  ChevronRight,
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Save,
  User,
  Phone,
  Home,
  FileCheck,
  Sparkles,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FormData {
  fullName: string
  fatherName: string
  dateOfBirth: string
  gender: string
  mobileNumber: string
  emailAddress: string
  permanentAddress: string
  currentAddress: string
  occupation: string
  monthlyIncome: string
  housingPreference: string
  preferredCity: string
  documents: {
    aadhar: File | null
    panCard: File | null
    incomeProof: File | null
    photo: File | null
  }
  legalAcknowledgment: boolean
  termsAgreement: boolean
  marketingConsent: boolean
}

export default function BookingForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    fatherName: "",
    dateOfBirth: "",
    gender: "",
    mobileNumber: "",
    emailAddress: "",
    permanentAddress: "",
    currentAddress: "",
    occupation: "",
    monthlyIncome: "",
    housingPreference: "",
    preferredCity: "",
    documents: {
      aadhar: null,
      panCard: null,
      incomeProof: null,
      photo: null,
    },
    legalAcknowledgment: false,
    termsAgreement: false,
    marketingConsent: false,
  })

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)

    const savedData = localStorage.getItem("sewas-application-draft")
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setFormData((prev) => ({ ...prev, ...parsed }))
      } catch (error) {
        console.error("Failed to load saved data:", error)
      }
    }

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const saveProgress = async () => {
    setIsSaving(true)
    try {
      localStorage.setItem("sewas-application-draft", JSON.stringify(formData))
      toast({
        title: "Progress Saved",
        description: "Your application progress has been saved automatically.",
      })
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save progress. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean | File | null) => {
    if (field.startsWith("documents.")) {
      const docField = field.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        documents: { ...prev.documents, [docField]: value },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }

    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!formData.fullName.trim()) errors.fullName = "Full name is required"
        if (!formData.fatherName.trim()) errors.fatherName = "Father's name is required"
        if (!formData.dateOfBirth) errors.dateOfBirth = "Date of birth is required"
        if (!formData.gender) errors.gender = "Gender is required"
        break
      case 2:
        if (!formData.mobileNumber.trim()) errors.mobileNumber = "Mobile number is required"
        else if (!/^\d{10}$/.test(formData.mobileNumber)) errors.mobileNumber = "Invalid mobile number"
        if (!formData.emailAddress.trim()) errors.emailAddress = "Email is required"
        else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) errors.emailAddress = "Invalid email format"
        if (!formData.permanentAddress.trim()) errors.permanentAddress = "Permanent address is required"
        if (!formData.occupation.trim()) errors.occupation = "Occupation is required"
        if (!formData.monthlyIncome) errors.monthlyIncome = "Monthly income is required"
        break
      case 3:
        if (!formData.housingPreference) errors.housingPreference = "Housing preference is required"
        if (!formData.preferredCity.trim()) errors.preferredCity = "Preferred city is required"
        break
      case 4:
        if (!formData.documents.aadhar) errors["documents.aadhar"] = "Aadhar card is required"
        if (!formData.documents.panCard) errors["documents.panCard"] = "PAN card is required"
        if (!formData.documents.incomeProof) errors["documents.incomeProof"] = "Income proof is required"
        if (!formData.documents.photo) errors["documents.photo"] = "Photo is required"
        break
      case 5:
        if (!formData.legalAcknowledgment) errors.legalAcknowledgment = "Legal acknowledgment is required"
        if (!formData.termsAgreement) errors.termsAgreement = "Terms agreement is required"
        break
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < 5) {
      setCurrentStep(currentStep + 1)
      saveProgress()
    }
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleFileUpload = (field: string, file: File | null) => {
    if (file && file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please select a file smaller than 5MB.",
        variant: "destructive",
      })
      return
    }
    handleInputChange(field, file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep(5)) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      localStorage.removeItem("sewas-application-draft")
      toast({
        title: "Application Submitted Successfully!",
        description: "We'll contact you within 24 hours with next steps.",
      })

      // Redirect to success page or dashboard
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const steps = [
    { number: 1, title: "Personal Details", icon: User },
    { number: 2, title: "Contact & Income", icon: Phone },
    { number: 3, title: "Housing Preference", icon: Home },
    { number: 4, title: "Documents", icon: FileText },
    { number: 5, title: "Review & Submit", icon: FileCheck },
  ]

  const progress = (currentStep / 5) * 100

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-12">
      <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-[var(--color-saffron)] to-orange-500 text-white pb-6 sm:pb-8 px-4 sm:px-6">
          <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4 sm:mb-6">
            Secure Your Home in SEWAS CITY
          </CardTitle>

          <div className="space-y-4">
            <Progress value={progress} className="h-2 bg-white/20" />
            <div className="flex justify-between items-center">
              {steps.map((step) => {
                const IconComponent = step.icon
                return (
                  <div key={step.number} className="flex flex-col items-center space-y-1 sm:space-y-2">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-300 ${
                        step.number === currentStep
                          ? "bg-white text-[var(--color-saffron)] shadow-lg scale-110"
                          : step.number < currentStep
                            ? "bg-white/90 text-green-600"
                            : "bg-white/20 text-white/70"
                      }`}
                    >
                      {step.number < currentStep ? (
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                      ) : (
                        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                      )}
                    </div>
                    <span className="text-xs font-medium text-center hidden sm:block lg:text-sm max-w-16 lg:max-w-20">
                      {step.title}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Personal Details */}
            {currentStep === 1 && (
              <div className="space-y-4 sm:space-y-6 animate-in slide-in-from-right-5 duration-300">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-saffron)]" />
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Personal Details</h3>
                </div>

                <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm sm:text-base">
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      placeholder="Enter your full name"
                      className={`h-12 text-base ${validationErrors.fullName ? "border-red-500" : ""}`}
                    />
                    {validationErrors.fullName && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {validationErrors.fullName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fatherName" className="text-sm sm:text-base">
                      Father's Name *
                    </Label>
                    <Input
                      id="fatherName"
                      type="text"
                      value={formData.fatherName}
                      onChange={(e) => handleInputChange("fatherName", e.target.value)}
                      placeholder="Enter your father's name"
                      className={`h-12 text-base ${validationErrors.fatherName ? "border-red-500" : ""}`}
                    />
                    {validationErrors.fatherName && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {validationErrors.fatherName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth" className="text-sm sm:text-base">
                      Date of Birth *
                    </Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      className={`h-12 text-base ${validationErrors.dateOfBirth ? "border-red-500" : ""}`}
                    />
                    {validationErrors.dateOfBirth && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {validationErrors.dateOfBirth}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-sm sm:text-base">
                      Gender *
                    </Label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                      <SelectTrigger className={`h-12 text-base ${validationErrors.gender ? "border-red-500" : ""}`}>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {validationErrors.gender && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {validationErrors.gender}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Contact & Income Information */}
            {currentStep === 2 && (
              <div className="space-y-4 sm:space-y-6 animate-in slide-in-from-right-5 duration-300">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-saffron)]" />
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Contact & Income Information</h3>
                </div>

                <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="mobileNumber" className="text-sm sm:text-base">
                      Mobile Number *
                    </Label>
                    <Input
                      id="mobileNumber"
                      type="tel"
                      inputMode="numeric"
                      value={formData.mobileNumber}
                      onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
                      placeholder="Enter 10-digit mobile number"
                      className={`h-12 text-base ${validationErrors.mobileNumber ? "border-red-500" : ""}`}
                    />
                    {validationErrors.mobileNumber && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {validationErrors.mobileNumber}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emailAddress" className="text-sm sm:text-base">
                      Email Address *
                    </Label>
                    <Input
                      id="emailAddress"
                      type="email"
                      inputMode="email"
                      value={formData.emailAddress}
                      onChange={(e) => handleInputChange("emailAddress", e.target.value)}
                      placeholder="Enter your email address"
                      className={`h-12 text-base ${validationErrors.emailAddress ? "border-red-500" : ""}`}
                    />
                    {validationErrors.emailAddress && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {validationErrors.emailAddress}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="occupation" className="text-sm sm:text-base">
                      Occupation *
                    </Label>
                    <Input
                      id="occupation"
                      type="text"
                      value={formData.occupation}
                      onChange={(e) => handleInputChange("occupation", e.target.value)}
                      placeholder="Enter your occupation"
                      className={`h-12 text-base ${validationErrors.occupation ? "border-red-500" : ""}`}
                    />
                    {validationErrors.occupation && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {validationErrors.occupation}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="monthlyIncome" className="text-sm sm:text-base">
                      Monthly Income *
                    </Label>
                    <Select
                      value={formData.monthlyIncome}
                      onValueChange={(value) => handleInputChange("monthlyIncome", value)}
                    >
                      <SelectTrigger
                        className={`h-12 text-base ${validationErrors.monthlyIncome ? "border-red-500" : ""}`}
                      >
                        <SelectValue placeholder="Select income range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="below-25000">Below ₹25,000</SelectItem>
                        <SelectItem value="25000-50000">₹25,000 - ₹50,000</SelectItem>
                        <SelectItem value="50000-100000">₹50,000 - ₹1,00,000</SelectItem>
                        <SelectItem value="above-100000">Above ₹1,00,000</SelectItem>
                      </SelectContent>
                    </Select>
                    {validationErrors.monthlyIncome && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {validationErrors.monthlyIncome}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="permanentAddress" className="text-sm sm:text-base">
                    Permanent Address *
                  </Label>
                  <Textarea
                    id="permanentAddress"
                    value={formData.permanentAddress}
                    onChange={(e) => handleInputChange("permanentAddress", e.target.value)}
                    placeholder="Enter your complete permanent address"
                    rows={3}
                    className={`text-base resize-none ${validationErrors.permanentAddress ? "border-red-500" : ""}`}
                  />
                  {validationErrors.permanentAddress && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {validationErrors.permanentAddress}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentAddress" className="text-sm sm:text-base">
                    Current Address (if different)
                  </Label>
                  <Textarea
                    id="currentAddress"
                    value={formData.currentAddress}
                    onChange={(e) => handleInputChange("currentAddress", e.target.value)}
                    placeholder="Enter current address if different from permanent"
                    rows={3}
                    className="text-base resize-none"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Housing Preference */}
            {currentStep === 3 && (
              <div className="space-y-4 sm:space-y-6 animate-in slide-in-from-right-5 duration-300">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <Home className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-saffron)]" />
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Housing Preference</h3>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-sm sm:text-base">Choose your preferred home type *</Label>
                    <RadioGroup
                      value={formData.housingPreference}
                      onValueChange={(value) => handleInputChange("housingPreference", value)}
                      className="grid gap-4"
                    >
                      <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors active:bg-gray-100">
                        <RadioGroupItem value="2bhk" id="2bhk" className="mt-1" />
                        <Label htmlFor="2bhk" className="flex-1 cursor-pointer">
                          <div className="font-semibold text-base">2 BHK - 540 sq. ft.</div>
                          <div className="text-sm text-gray-600">Perfect for small families</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors active:bg-gray-100">
                        <RadioGroupItem value="3bhk" id="3bhk" className="mt-1" />
                        <Label htmlFor="3bhk" className="flex-1 cursor-pointer">
                          <div className="font-semibold text-base">3 BHK - 720 sq. ft.</div>
                          <div className="text-sm text-gray-600">Ideal for growing families</div>
                        </Label>
                      </div>
                    </RadioGroup>
                    {validationErrors.housingPreference && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {validationErrors.housingPreference}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preferredCity" className="text-sm sm:text-base">
                      Preferred City *
                    </Label>
                    <PreferredCitySelect
                      value={formData.preferredCity}
                      onChange={(v) => handleInputChange("preferredCity", v)}
                      placeholder="Type to search cities (e.g., Mumbai, Pune, Jaipur)…"
                      className={`${validationErrors.preferredCity ? "border-red-500" : ""}`}
                    />
                    {validationErrors.preferredCity && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {validationErrors.preferredCity}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">
                      Tip: Try typing "Mumbai" to see Mumbai City and Mumbai Suburban. The value will be saved as "City
                      — State".
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Document Upload */}
            {currentStep === 4 && (
              <div className="space-y-4 sm:space-y-6 animate-in slide-in-from-right-5 duration-300">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-saffron)]" />
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Document Upload</h3>
                </div>

                <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                  {[
                    { key: "aadhar", label: "Aadhar Card", required: true },
                    { key: "panCard", label: "PAN Card", required: true },
                    { key: "incomeProof", label: "Income Proof", required: true },
                    { key: "photo", label: "Passport Photo", required: true },
                  ].map((doc) => (
                    <div key={doc.key} className="space-y-2">
                      <Label htmlFor={doc.key} className="text-sm sm:text-base">
                        {doc.label} {doc.required && "*"}
                      </Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center hover:border-[var(--color-saffron)] transition-colors active:bg-gray-50">
                        <input
                          id={doc.key}
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileUpload(`documents.${doc.key}`, e.target.files?.[0] || null)}
                          className="hidden"
                        />
                        <label htmlFor={doc.key} className="cursor-pointer block">
                          {formData.documents[doc.key as keyof typeof formData.documents] ? (
                            <div className="flex items-center justify-center gap-2 text-green-600">
                              <CheckCircle className="w-6 h-6" />
                              <span className="text-sm sm:text-base">File uploaded</span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-2">
                              <Upload className="w-8 h-8 text-gray-400" />
                              <span className="text-sm text-gray-600">Tap to upload</span>
                              <span className="text-xs text-gray-400">Max 5MB</span>
                            </div>
                          )}
                        </label>
                      </div>
                      {validationErrors[`documents.${doc.key}`] && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {validationErrors[`documents.${doc.key}`]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Review & Submit */}
            {currentStep === 5 && (
              <div className="space-y-4 sm:space-y-6 animate-in slide-in-from-right-5 duration-300">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <FileCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-saffron)]" />
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Review & Submit</h3>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 sm:p-6 space-y-4">
                  <h4 className="font-semibold text-base sm:text-lg">Application Summary</h4>
                  <div className="grid gap-3 sm:gap-4 md:grid-cols-2 text-sm sm:text-base">
                    <div>
                      <strong>Name:</strong> {formData.fullName}
                    </div>
                    <div>
                      <strong>Email:</strong> {formData.emailAddress}
                    </div>
                    <div>
                      <strong>Mobile:</strong> {formData.mobileNumber}
                    </div>
                    <div>
                      <strong>Housing:</strong> {formData.housingPreference?.toUpperCase()}
                    </div>
                    <div>
                      <strong>City:</strong> {formData.preferredCity}
                    </div>
                    <div>
                      <strong>Income:</strong> {formData.monthlyIncome}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="legalAcknowledgment"
                      checked={formData.legalAcknowledgment}
                      onCheckedChange={(checked) => handleInputChange("legalAcknowledgment", checked as boolean)}
                      className="mt-1"
                    />
                    <Label
                      htmlFor="legalAcknowledgment"
                      className="text-sm sm:text-base leading-relaxed cursor-pointer"
                    >
                      I acknowledge that the project's legal documents, permissions, and licenses are currently under
                      construction.
                    </Label>
                  </div>
                  {validationErrors.legalAcknowledgment && (
                    <p className="text-red-500 text-sm flex items-center gap-1 ml-6">
                      <AlertCircle className="w-4 h-4" />
                      {validationErrors.legalAcknowledgment}
                    </p>
                  )}

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="termsAgreement"
                      checked={formData.termsAgreement}
                      onCheckedChange={(checked) => handleInputChange("termsAgreement", checked as boolean)}
                      className="mt-1"
                    />
                    <Label htmlFor="termsAgreement" className="text-sm sm:text-base leading-relaxed cursor-pointer">
                      I have read and agree to the terms and conditions.
                    </Label>
                  </div>
                  {validationErrors.termsAgreement && (
                    <p className="text-red-500 text-sm flex items-center gap-1 ml-6">
                      <AlertCircle className="w-4 h-4" />
                      {validationErrors.termsAgreement}
                    </p>
                  )}

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="marketingConsent"
                      checked={formData.marketingConsent}
                      onCheckedChange={(checked) => handleInputChange("marketingConsent", checked as boolean)}
                      className="mt-1"
                    />
                    <Label htmlFor="marketingConsent" className="text-sm sm:text-base leading-relaxed cursor-pointer">
                      I consent to receive marketing communications and updates about SEWAS CITY projects.
                    </Label>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 pt-6 sm:pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="flex items-center justify-center space-x-2 bg-transparent h-12 active:scale-95 transition-transform"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </Button>
                )}

                <Button
                  type="button"
                  variant="ghost"
                  onClick={saveProgress}
                  disabled={isSaving}
                  className="flex items-center justify-center space-x-2 text-gray-600 h-12 active:scale-95 transition-transform"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? "Saving..." : "Save Progress"}</span>
                </Button>
              </div>

              {currentStep < 5 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-[var(--color-saffron)] to-orange-500 hover:from-orange-500 hover:to-[var(--color-saffron)] text-white px-6 sm:px-8 py-3 h-12 active:scale-95 transition-transform"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 sm:px-12 py-4 text-base sm:text-lg font-semibold h-12 sm:h-auto active:scale-95 transition-transform"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Submit Application</span>
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
