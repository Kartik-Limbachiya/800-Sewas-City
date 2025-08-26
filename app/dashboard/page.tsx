"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Home,
  FileText,
  MessageSquare,
  Bell,
  Download,
  Upload,
  Calendar,
  CheckCircle,
  Clock,
  TrendingUp,
  MapPin,
  Phone,
  Mail,
  Edit,
  Eye,
} from "lucide-react"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock user data
  const userData = {
    name: "Rajesh Kumar",
    applicationId: "SEWAS2024001234",
    email: "rajesh.kumar@email.com",
    phone: "+91 9876543210",
    status: "under-review",
    progress: 65,
    submittedDate: "2024-01-15",
    expectedCompletion: "2024-02-28",
    housingType: "3 BHK",
    preferredCity: "Ahmedabad",
  }

  const applicationSteps = [
    { id: 1, title: "Application Submitted", status: "completed", date: "2024-01-15" },
    { id: 2, title: "Document Verification", status: "completed", date: "2024-01-18" },
    { id: 3, title: "Financial Assessment", status: "in-progress", date: "2024-01-22" },
    { id: 4, title: "Property Allocation", status: "pending", date: null },
    { id: 5, title: "Legal Documentation", status: "pending", date: null },
    { id: 6, title: "Final Approval", status: "pending", date: null },
  ]

  const documents = [
    { name: "Aadhar Card", status: "verified", uploadDate: "2024-01-15", size: "2.3 MB" },
    { name: "PAN Card", status: "verified", uploadDate: "2024-01-15", size: "1.8 MB" },
    { name: "Income Proof", status: "pending", uploadDate: "2024-01-15", size: "3.1 MB" },
    { name: "Bank Statement", status: "required", uploadDate: null, size: null },
  ]

  const notifications = [
    {
      id: 1,
      title: "Document Verification Complete",
      message: "Your submitted documents have been successfully verified.",
      date: "2024-01-18",
      type: "success",
    },
    {
      id: 2,
      title: "Additional Document Required",
      message: "Please upload your latest bank statement for financial assessment.",
      date: "2024-01-20",
      type: "warning",
    },
    {
      id: 3,
      title: "Site Visit Scheduled",
      message: "Your property site visit has been scheduled for next week.",
      date: "2024-01-22",
      type: "info",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in-progress":
        return "bg-blue-500"
      case "pending":
        return "bg-gray-300"
      case "verified":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "required":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--color-saffron)] to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {userData.name}</h1>
              <p className="text-white/90 mt-2">Application ID: {userData.applicationId}</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="secondary" size="sm" className="bg-white/20 text-white border-white/30">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="secondary" size="sm" className="bg-white/20 text-white border-white/30">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Application Status</p>
                  <p className="text-2xl font-bold capitalize">{userData.status.replace("-", " ")}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Progress</p>
                  <p className="text-2xl font-bold">{userData.progress}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Housing Type</p>
                  <p className="text-2xl font-bold">{userData.housingType}</p>
                </div>
                <Home className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Expected Completion</p>
                  <p className="text-lg font-bold">{userData.expectedCompletion}</p>
                </div>
                <Calendar className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white shadow-lg border-0">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-[var(--color-saffron)] data-[state=active]:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="progress"
              className="data-[state=active]:bg-[var(--color-saffron)] data-[state=active]:text-white"
            >
              Progress
            </TabsTrigger>
            <TabsTrigger
              value="documents"
              className="data-[state=active]:bg-[var(--color-saffron)] data-[state=active]:text-white"
            >
              Documents
            </TabsTrigger>
            <TabsTrigger
              value="messages"
              className="data-[state=active]:bg-[var(--color-saffron)] data-[state=active]:text-white"
            >
              Messages
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-[var(--color-saffron)] data-[state=active]:text-white"
            >
              Profile
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Application Progress */}
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-[var(--color-saffron)]" />
                      Application Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Overall Progress</span>
                        <span className="text-sm text-gray-600">{userData.progress}%</span>
                      </div>
                      <Progress value={userData.progress} className="h-3" />
                      <p className="text-sm text-gray-600">
                        Your application is currently under financial assessment. Expected completion by{" "}
                        {userData.expectedCompletion}.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-[var(--color-saffron)]" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {applicationSteps.slice(0, 3).map((step) => (
                        <div key={step.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(step.status)}`} />
                          <div className="flex-1">
                            <p className="font-medium">{step.title}</p>
                            {step.date && <p className="text-sm text-gray-600">{step.date}</p>}
                          </div>
                          <Badge variant={step.status === "completed" ? "default" : "secondary"}>{step.status}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start bg-[var(--color-saffron)] hover:bg-orange-500">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Document
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Visit
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contact Support
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </Button>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="text-lg">Your Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{userData.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{userData.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{userData.preferredCity}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Application Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {applicationSteps.map((step, index) => (
                    <div key={step.id} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            step.status === "completed"
                              ? "bg-green-500 text-white"
                              : step.status === "in-progress"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {step.status === "completed" ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : step.status === "in-progress" ? (
                            <Clock className="w-4 h-4" />
                          ) : (
                            <span className="text-xs font-bold">{step.id}</span>
                          )}
                        </div>
                        {index < applicationSteps.length - 1 && (
                          <div
                            className={`w-0.5 h-12 mt-2 ${
                              step.status === "completed" ? "bg-green-500" : "bg-gray-200"
                            }`}
                          />
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <h3 className="font-semibold text-lg">{step.title}</h3>
                        {step.date && <p className="text-sm text-gray-600 mt-1">Completed on {step.date}</p>}
                        {step.status === "in-progress" && (
                          <p className="text-sm text-blue-600 mt-1">Currently in progress...</p>
                        )}
                        {step.status === "pending" && (
                          <p className="text-sm text-gray-500 mt-1">Waiting for previous steps to complete</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Document Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <FileText className="w-8 h-8 text-gray-400" />
                        <div>
                          <h4 className="font-medium">{doc.name}</h4>
                          {doc.uploadDate && (
                            <p className="text-sm text-gray-600">
                              Uploaded on {doc.uploadDate} • {doc.size}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
                        {doc.status === "required" ? (
                          <Button size="sm" className="bg-[var(--color-saffron)] hover:bg-orange-500">
                            <Upload className="w-4 h-4 mr-1" />
                            Upload
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Notifications & Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-4 border rounded-lg">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${
                            notification.type === "success"
                              ? "bg-green-500"
                              : notification.type === "warning"
                                ? "bg-yellow-500"
                                : "bg-blue-500"
                          }`}
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{notification.title}</h4>
                          <p className="text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-sm text-gray-500 mt-2">{notification.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Profile Information
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Full Name</label>
                      <p className="mt-1 text-gray-900">{userData.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Email Address</label>
                      <p className="mt-1 text-gray-900">{userData.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Phone Number</label>
                      <p className="mt-1 text-gray-900">{userData.phone}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Application ID</label>
                      <p className="mt-1 text-gray-900">{userData.applicationId}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Preferred City</label>
                      <p className="mt-1 text-gray-900">{userData.preferredCity}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Housing Type</label>
                      <p className="mt-1 text-gray-900">{userData.housingType}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
