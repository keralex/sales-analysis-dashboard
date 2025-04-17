"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Bell, Moon, Sun, User, Globe, Shield, Mail, CreditCard } from "lucide-react"

export default function SettingsForm() {
    // User profile state
    const [profile, setProfile] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Administrator",
        company: "StepMaster Shoes",
        bio: "Sales manager with 5+ years of experience in the footwear industry.",
        avatar: "/placeholder-user.jpg",
    })

    // Appearance settings
    const [appearance, setAppearance] = useState({
        theme: "system",
        fontSize: "medium",
        reducedMotion: false,
        highContrast: false,
    })

    // Notification settings
    const [notifications, setNotifications] = useState({
        orderUpdates: true,
        salesReports: true,
        inventoryAlerts: true,
        marketingEmails: false,
        productUpdates: true,
        securityAlerts: true,
    })

    // Regional settings
    const [regional, setRegional] = useState({
        language: "english",
        timezone: "UTC-5",
        currency: "usd",
        dateFormat: "MM/DD/YYYY",
    })

    // Security settings
    const [security, setSecurity] = useState({
        twoFactorAuth: false,
        sessionTimeout: "30",
        passwordExpiry: "90",
        loginNotifications: true,
    })

    // Handle profile form submission
    const handleProfileSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        toast({
            title: "Profile updated",
            description: "Your profile information has been updated successfully.",
        })
    }

    // Handle appearance form submission
    const handleAppearanceSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        toast({
            title: "Appearance settings updated",
            description: "Your appearance preferences have been saved.",
        })
    }

    // Handle notification form submission
    const handleNotificationSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        toast({
            title: "Notification preferences updated",
            description: "Your notification settings have been saved.",
        })
    }

    // Handle regional form submission
    const handleRegionalSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        toast({
            title: "Regional settings updated",
            description: "Your regional preferences have been saved.",
        })
    }

    // Handle security form submission
    const handleSecuritySubmit = (e: React.FormEvent) => {
        e.preventDefault()
        toast({
            title: "Security settings updated",
            description: "Your security preferences have been saved.",
        })
    }

    return (
        <Tabs defaultValue="profile" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">Profile</span>
                </TabsTrigger>
                <TabsTrigger value="appearance" className="flex items-center gap-2">
                    <Sun className="h-4 w-4" />
                    <span className="hidden sm:inline">Appearance</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    <span className="hidden sm:inline">Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="regional" className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span className="hidden sm:inline">Regional</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span className="hidden sm:inline">Security</span>
                </TabsTrigger>
            </TabsList>

            {/* Profile Settings */}
            <TabsContent value="profile">
                <Card>
                    <CardHeader>
                        <CardTitle>Profile</CardTitle>
                        <CardDescription>Manage your personal information and account details.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <form onSubmit={handleProfileSubmit} className="space-y-4">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="space-y-2 flex-1">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        value={profile.name}
                                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2 flex-1">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={profile.email}
                                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="space-y-2 flex-1">
                                    <Label htmlFor="role">Role</Label>
                                    <Input
                                        id="role"
                                        value={profile.role}
                                        onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2 flex-1">
                                    <Label htmlFor="company">Company</Label>
                                    <Input
                                        id="company"
                                        value={profile.company}
                                        onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea
                                    id="bio"
                                    value={profile.bio}
                                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                    className="min-h-[100px]"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="avatar">Profile Picture</Label>
                                <div className="flex items-center gap-4">
                                    <img
                                        src={profile.avatar || "/placeholder.svg"}
                                        alt="Profile"
                                        className="h-16 w-16 rounded-full object-cover"
                                    />
                                    <Button variant="outline" type="button">
                                        Change Avatar
                                    </Button>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <Label htmlFor="current-password">Current Password</Label>
                                <Input id="current-password" type="password" />
                                <p className="text-xs text-muted-foreground">Enter your current password to confirm changes.</p>
                            </div>

                            <Button type="submit">Save Changes</Button>
                        </form>
                    </CardContent>
                </Card>
            </TabsContent>

            {/* Appearance Settings */}
            <TabsContent value="appearance">
                <Card>
                    <CardHeader>
                        <CardTitle>Appearance</CardTitle>
                        <CardDescription>Customize how the dashboard looks and feels.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <form onSubmit={handleAppearanceSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="theme">Theme</Label>
                                <Select
                                    value={appearance.theme}
                                    onValueChange={(value) => setAppearance({ ...appearance, theme: value })}
                                >
                                    <SelectTrigger id="theme">
                                        <SelectValue placeholder="Select theme" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="light">
                                            <div className="flex items-center gap-2">
                                                <Sun className="h-4 w-4" />
                                                <span>Light</span>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="dark">
                                            <div className="flex items-center gap-2">
                                                <Moon className="h-4 w-4" />
                                                <span>Dark</span>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="system">System Default</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="font-size">Font Size</Label>
                                <Select
                                    value={appearance.fontSize}
                                    onValueChange={(value) => setAppearance({ ...appearance, fontSize: value })}
                                >
                                    <SelectTrigger id="font-size">
                                        <SelectValue placeholder="Select font size" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="small">Small</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="large">Large</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="reduced-motion">Reduced Motion</Label>
                                        <p className="text-xs text-muted-foreground">Reduce the amount of animations in the interface.</p>
                                    </div>
                                    <Switch
                                        id="reduced-motion"
                                        checked={appearance.reducedMotion}
                                        onCheckedChange={(checked) => setAppearance({ ...appearance, reducedMotion: checked })}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="high-contrast">High Contrast</Label>
                                        <p className="text-xs text-muted-foreground">Increase contrast for better visibility.</p>
                                    </div>
                                    <Switch
                                        id="high-contrast"
                                        checked={appearance.highContrast}
                                        onCheckedChange={(checked) => setAppearance({ ...appearance, highContrast: checked })}
                                    />
                                </div>
                            </div>

                            <Button type="submit">Save Preferences</Button>
                        </form>
                    </CardContent>
                </Card>
            </TabsContent>

            {/* Notification Settings */}
            <TabsContent value="notifications">
                <Card>
                    <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                        <CardDescription>Configure how and when you receive notifications.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <form onSubmit={handleNotificationSubmit} className="space-y-4">
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium">Email Notifications</h3>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="order-updates">Order Updates</Label>
                                        <p className="text-xs text-muted-foreground">Receive notifications about order status changes.</p>
                                    </div>
                                    <Switch
                                        id="order-updates"
                                        checked={notifications.orderUpdates}
                                        onCheckedChange={(checked) => setNotifications({ ...notifications, orderUpdates: checked })}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="sales-reports">Sales Reports</Label>
                                        <p className="text-xs text-muted-foreground">Receive daily, weekly, or monthly sales reports.</p>
                                    </div>
                                    <Switch
                                        id="sales-reports"
                                        checked={notifications.salesReports}
                                        onCheckedChange={(checked) => setNotifications({ ...notifications, salesReports: checked })}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="inventory-alerts">Inventory Alerts</Label>
                                        <p className="text-xs text-muted-foreground">Get notified when inventory is low or out of stock.</p>
                                    </div>
                                    <Switch
                                        id="inventory-alerts"
                                        checked={notifications.inventoryAlerts}
                                        onCheckedChange={(checked) => setNotifications({ ...notifications, inventoryAlerts: checked })}
                                    />
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-sm font-medium">Marketing Communications</h3>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="marketing-emails">Marketing Emails</Label>
                                        <p className="text-xs text-muted-foreground">Receive promotional emails and special offers.</p>
                                    </div>
                                    <Switch
                                        id="marketing-emails"
                                        checked={notifications.marketingEmails}
                                        onCheckedChange={(checked) => setNotifications({ ...notifications, marketingEmails: checked })}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="product-updates">Product Updates</Label>
                                        <p className="text-xs text-muted-foreground">Get notified about new products and features.</p>
                                    </div>
                                    <Switch
                                        id="product-updates"
                                        checked={notifications.productUpdates}
                                        onCheckedChange={(checked) => setNotifications({ ...notifications, productUpdates: checked })}
                                    />
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-sm font-medium">System Notifications</h3>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="security-alerts">Security Alerts</Label>
                                        <p className="text-xs text-muted-foreground">
                                            Receive notifications about security-related events.
                                        </p>
                                    </div>
                                    <Switch
                                        id="security-alerts"
                                        checked={notifications.securityAlerts}
                                        onCheckedChange={(checked) => setNotifications({ ...notifications, securityAlerts: checked })}
                                    />
                                </div>
                            </div>

                            <Button type="submit">Save Preferences</Button>
                        </form>
                    </CardContent>
                </Card>
            </TabsContent>

            {/* Regional Settings */}
            <TabsContent value="regional">
                <Card>
                    <CardHeader>
                        <CardTitle>Regional Settings</CardTitle>
                        <CardDescription>Configure language, timezone, and other regional preferences.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <form onSubmit={handleRegionalSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="language">Language</Label>
                                <Select
                                    value={regional.language}
                                    onValueChange={(value) => setRegional({ ...regional, language: value })}
                                >
                                    <SelectTrigger id="language">
                                        <SelectValue placeholder="Select language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="english">English</SelectItem>
                                        <SelectItem value="spanish">Spanish</SelectItem>
                                        <SelectItem value="french">French</SelectItem>
                                        <SelectItem value="german">German</SelectItem>
                                        <SelectItem value="chinese">Chinese</SelectItem>
                                        <SelectItem value="japanese">Japanese</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="timezone">Timezone</Label>
                                <Select
                                    value={regional.timezone}
                                    onValueChange={(value) => setRegional({ ...regional, timezone: value })}
                                >
                                    <SelectTrigger id="timezone">
                                        <SelectValue placeholder="Select timezone" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                                        <SelectItem value="UTC-7">Mountain Time (UTC-7)</SelectItem>
                                        <SelectItem value="UTC-6">Central Time (UTC-6)</SelectItem>
                                        <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                                        <SelectItem value="UTC+0">Greenwich Mean Time (UTC+0)</SelectItem>
                                        <SelectItem value="UTC+1">Central European Time (UTC+1)</SelectItem>
                                        <SelectItem value="UTC+8">China Standard Time (UTC+8)</SelectItem>
                                        <SelectItem value="UTC+9">Japan Standard Time (UTC+9)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="currency">Currency</Label>
                                <Select
                                    value={regional.currency}
                                    onValueChange={(value) => setRegional({ ...regional, currency: value })}
                                >
                                    <SelectTrigger id="currency">
                                        <SelectValue placeholder="Select currency" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="usd">US Dollar ($)</SelectItem>
                                        <SelectItem value="eur">Euro (€)</SelectItem>
                                        <SelectItem value="gbp">British Pound (£)</SelectItem>
                                        <SelectItem value="jpy">Japanese Yen (¥)</SelectItem>
                                        <SelectItem value="cny">Chinese Yuan (¥)</SelectItem>
                                        <SelectItem value="cad">Canadian Dollar (C$)</SelectItem>
                                        <SelectItem value="aud">Australian Dollar (A$)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="date-format">Date Format</Label>
                                <Select
                                    value={regional.dateFormat}
                                    onValueChange={(value) => setRegional({ ...regional, dateFormat: value })}
                                >
                                    <SelectTrigger id="date-format">
                                        <SelectValue placeholder="Select date format" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                                        <SelectItem value="YYYY/MM/DD">YYYY/MM/DD</SelectItem>
                                        <SelectItem value="DD-MMM-YYYY">DD-MMM-YYYY</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button type="submit">Save Preferences</Button>
                        </form>
                    </CardContent>
                </Card>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security">
                <Card>
                    <CardHeader>
                        <CardTitle>Security Settings</CardTitle>
                        <CardDescription>Manage your account security and authentication preferences.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <form onSubmit={handleSecuritySubmit} className="space-y-4">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                                        <p className="text-xs text-muted-foreground">Add an extra layer of security to your account.</p>
                                    </div>
                                    <Switch
                                        id="two-factor"
                                        checked={security.twoFactorAuth}
                                        onCheckedChange={(checked) => setSecurity({ ...security, twoFactorAuth: checked })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                                    <Select
                                        value={security.sessionTimeout}
                                        onValueChange={(value) => setSecurity({ ...security, sessionTimeout: value })}
                                    >
                                        <SelectTrigger id="session-timeout">
                                            <SelectValue placeholder="Select timeout" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="15">15 minutes</SelectItem>
                                            <SelectItem value="30">30 minutes</SelectItem>
                                            <SelectItem value="60">1 hour</SelectItem>
                                            <SelectItem value="120">2 hours</SelectItem>
                                            <SelectItem value="240">4 hours</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <p className="text-xs text-muted-foreground">Automatically log out after a period of inactivity.</p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                                    <Select
                                        value={security.passwordExpiry}
                                        onValueChange={(value) => setSecurity({ ...security, passwordExpiry: value })}
                                    >
                                        <SelectTrigger id="password-expiry">
                                            <SelectValue placeholder="Select expiry period" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="30">30 days</SelectItem>
                                            <SelectItem value="60">60 days</SelectItem>
                                            <SelectItem value="90">90 days</SelectItem>
                                            <SelectItem value="180">180 days</SelectItem>
                                            <SelectItem value="never">Never</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <p className="text-xs text-muted-foreground">Require password change after specified period.</p>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="login-notifications">Login Notifications</Label>
                                        <p className="text-xs text-muted-foreground">Receive email notifications for new login attempts.</p>
                                    </div>
                                    <Switch
                                        id="login-notifications"
                                        checked={security.loginNotifications}
                                        onCheckedChange={(checked) => setSecurity({ ...security, loginNotifications: checked })}
                                    />
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <h3 className="text-sm font-medium">Change Password</h3>
                                <div className="space-y-2">
                                    <Label htmlFor="current-password-security">Current Password</Label>
                                    <Input id="current-password-security" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="new-password">New Password</Label>
                                    <Input id="new-password" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                                    <Input id="confirm-password" type="password" />
                                </div>
                            </div>

                            <Button type="submit">Save Security Settings</Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start">
                        <h3 className="text-sm font-medium mb-2">Connected Accounts</h3>
                        <div className="w-full space-y-2">
                            <div className="flex items-center justify-between p-2 border rounded-md">
                                <div className="flex items-center gap-2">
                                    <Mail className="h-5 w-5" />
                                    <div>
                                        <p className="text-sm font-medium">Email</p>
                                        <p className="text-xs text-muted-foreground">{profile.email}</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">
                                    Manage
                                </Button>
                            </div>
                            <div className="flex items-center justify-between p-2 border rounded-md">
                                <div className="flex items-center gap-2">
                                    <CreditCard className="h-5 w-5" />
                                    <div>
                                        <p className="text-sm font-medium">Payment Methods</p>
                                        <p className="text-xs text-muted-foreground">Manage your payment methods</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">
                                    Manage
                                </Button>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    )
}
