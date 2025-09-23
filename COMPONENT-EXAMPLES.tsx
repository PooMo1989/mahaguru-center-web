// 🧱 Component Library Usage Examples
// Copy these patterns when enhancing UI

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

// 🎯 Common UI Enhancement Patterns

// 1. Enhanced Button Groups
function ButtonExamples() {
  return (
    <div className="flex gap-2">
      <Button>Primary Action</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Delete</Button>
    </div>
  );
}

// 2. Modern Card Layouts
function CardExamples() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Enhanced Card</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>Beautiful card content with proper spacing</p>
        <div className="flex items-center justify-between">
          <Badge variant="secondary">Status</Badge>
          <Button size="sm">Action</Button>
        </div>
      </CardContent>
    </Card>
  );
}

// 3. Enhanced Form Layouts
function FormExamples() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          className="transition-all duration-200 focus:ring-2"
        />
      </div>

      <Separator />

      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}

// 4. Enhanced Tab Navigation
function TabExamples() {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-6">
        <Card>
          <CardContent className="pt-6">
            <p>Overview content with enhanced styling</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

// 🎨 Color Classes (from Design System)
const colorClasses = {
  // Primary colors
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",

  // Semantic colors
  success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  warning:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  error: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",

  // Neutral colors
  muted: "bg-muted text-muted-foreground",
  accent: "bg-accent text-accent-foreground",
};

// 📐 Layout Classes (from Design System)
const layoutClasses = {
  // Responsive grids
  grid2: "grid grid-cols-1 md:grid-cols-2 gap-6",
  grid3: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
  grid4: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",

  // Spacing
  section: "py-12",
  container: "container mx-auto px-4",
  cardSpacing: "space-y-6",
  formSpacing: "space-y-4",

  // Flexbox
  centerFlex: "flex items-center justify-center",
  spaceBetween: "flex items-center justify-between",
  flexCol: "flex flex-col space-y-4",
};

export {
  ButtonExamples,
  CardExamples,
  FormExamples,
  TabExamples,
  colorClasses,
  layoutClasses,
};
