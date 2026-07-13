import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { ArrowRight, CheckCircle2, AlertCircle, ShoppingCart, Layout } from 'lucide-react';

export default function DesignSystem() {
  return (
    <div className="min-h-screen bg-[#faf8f5] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <Link to="/owner-dashboard" className="text-[#b8956a] hover:underline flex items-center gap-2 mb-4">
            &larr; Back to Dashboard
          </Link>
          <h1 className="text-4xl font-serif text-[#2c2c2c] mb-4">Design System</h1>
          <p className="text-[#6b6b6b] max-w-2xl">
            A comprehensive guide to the design tokens, components, and patterns used throughout SkinByEmely.
            Use this as a reference when building new pages or features.
          </p>
        </div>

        <div className="space-y-16">
          {/* Colors */}
          <section>
            <h2 className="text-2xl font-serif text-[#2c2c2c] mb-6 border-b border-[#b8956a]/20 pb-2">Colors</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-[#b8956a] shadow-sm"></div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-[#2c2c2c]">Bronze (Primary)</span>
                  <code className="text-xs bg-white px-2 py-1 rounded border">#b8956a</code>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-[#d4bb8f] shadow-sm"></div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-[#2c2c2c]">Bronze Light</span>
                  <code className="text-xs bg-white px-2 py-1 rounded border">#d4bb8f</code>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-[#9d7d54] shadow-sm"></div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-[#2c2c2c]">Bronze Dark</span>
                  <code className="text-xs bg-white px-2 py-1 rounded border">#9d7d54</code>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-gradient-bronze shadow-sm"></div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-[#2c2c2c]">Gradient Bronze</span>
                  <code className="text-xs bg-white px-2 py-1 rounded border">.bg-gradient-bronze</code>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-[#2c2c2c] shadow-sm"></div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-[#2c2c2c]">Charcoal (Text)</span>
                  <code className="text-xs bg-white px-2 py-1 rounded border">#2c2c2c</code>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-[#4a4a4a] shadow-sm"></div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-[#2c2c2c]">Warm Stone</span>
                  <code className="text-xs bg-white px-2 py-1 rounded border">#4a4a4a</code>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-[#faf8f5] shadow-sm border"></div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-[#2c2c2c]">Ivory (Background)</span>
                  <code className="text-xs bg-white px-2 py-1 rounded border">#faf8f5</code>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-24 rounded-lg bg-[#f5f3f0] shadow-sm border"></div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-[#2c2c2c]">Cream</span>
                  <code className="text-xs bg-white px-2 py-1 rounded border">#f5f3f0</code>
                </div>
              </div>
            </div>
          </section>

          {/* Typography */}
          <section>
            <h2 className="text-2xl font-serif text-[#2c2c2c] mb-6 border-b border-[#b8956a]/20 pb-2">Typography</h2>
            
            <div className="space-y-8 p-8 bg-white rounded-lg border border-[#b8956a]/10">
              <div className="space-y-2">
                <p className="text-sm text-[#6b6b6b] uppercase tracking-wider">Heading 1 (Cormorant Garamond)</p>
                <h1 className="text-5xl font-serif text-[#2c2c2c]">Elegant Intentional Luxury</h1>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-[#6b6b6b] uppercase tracking-wider">Heading 2 (Cormorant Garamond)</p>
                <h2 className="text-4xl font-serif text-[#2c2c2c]">Skin & Scalp Rejuvenation</h2>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-[#6b6b6b] uppercase tracking-wider">Heading 3 (Cormorant Garamond)</p>
                <h3 className="text-3xl font-serif text-[#2c2c2c]">Featured Treatments</h3>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-[#6b6b6b] uppercase tracking-wider">Heading 4 (Inter)</p>
                <h4 className="text-xl font-medium tracking-wide text-[#2c2c2c]">TREATMENT DETAILS</h4>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-[#6b6b6b] uppercase tracking-wider">Body Text (Inter)</p>
                <p className="text-[#4a4a4a] leading-relaxed max-w-2xl">
                  Our treatments are designed to provide a luxurious experience while delivering real results. 
                  We use the finest ingredients and latest technology to ensure your skin receives the best care possible.
                  Experience the perfect fusion of expertise, science, and sophistication.
                </p>
              </div>
            </div>
          </section>

          {/* Buttons */}
          <section>
            <h2 className="text-2xl font-serif text-[#2c2c2c] mb-6 border-b border-[#b8956a]/20 pb-2">Buttons</h2>
            
            <div className="flex flex-wrap gap-6 p-8 bg-white rounded-lg border border-[#b8956a]/10">
              <div className="space-y-4">
                <p className="text-sm font-medium text-[#6b6b6b]">Primary Action</p>
                <Button className="btn-bronze">
                  Book Appointment
                </Button>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm font-medium text-[#6b6b6b]">Secondary Action</p>
                <Button className="btn-outline-bronze">
                  View Menu
                </Button>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm font-medium text-[#6b6b6b]">With Icon</p>
                <Button className="btn-bronze gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </Button>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-medium text-[#6b6b6b]">Ghost / Link</p>
                <Button variant="ghost" className="text-[#b8956a] hover:text-[#9d7d54] hover:bg-[#b8956a]/10">
                  Read More &rarr;
                </Button>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-medium text-[#6b6b6b]">Disabled</p>
                <Button className="btn-bronze opacity-50 cursor-not-allowed">
                  Unavailable
                </Button>
              </div>
            </div>
          </section>

          {/* Components */}
          <section>
            <h2 className="text-2xl font-serif text-[#2c2c2c] mb-6 border-b border-[#b8956a]/20 pb-2">Components</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Product Card */}
              <div className="space-y-4">
                <p className="text-sm font-medium text-[#6b6b6b]">Premium Card</p>
                <Card className="card-premium overflow-hidden">
                  <div className="h-48 bg-[#f5f3f0] flex items-center justify-center text-[#d4bb8f]">
                    <Layout className="w-12 h-12 opacity-50" />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="font-serif text-xl">Hydrating Serum</CardTitle>
                        <CardDescription>Circadia Skincare</CardDescription>
                      </div>
                      <span className="text-[#b8956a] font-medium">$85.00</span>
                    </div>
                  </CardHeader>
                  <CardFooter>
                    <Button className="w-full btn-outline-bronze">Add to Cart</Button>
                  </CardFooter>
                </Card>
              </div>

              {/* Form Elements */}
              <div className="space-y-4">
                <p className="text-sm font-medium text-[#6b6b6b]">Form Elements</p>
                <Card className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input placeholder="hello@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Service Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="facial">Facial</SelectItem>
                        <SelectItem value="peel">Peel</SelectItem>
                        <SelectItem value="microneedling">Microneedling</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms">Accept terms and conditions</Label>
                  </div>

                  <Separator className="bg-[#b8956a]/20" />

                  <div className="space-y-2">
                    <Label>Notification Preference</Label>
                    <RadioGroup defaultValue="email">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="email" id="email" />
                        <Label htmlFor="email">Email</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sms" id="sms" />
                        <Label htmlFor="sms">SMS</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </Card>
              </div>
            </div>
          </section>

          {/* Feedback & Status */}
          <section>
            <h2 className="text-2xl font-serif text-[#2c2c2c] mb-6 border-b border-[#b8956a]/20 pb-2">Feedback & Status</h2>
            
            <div className="space-y-4">
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">Success</AlertTitle>
                <AlertDescription className="text-green-700">
                  Your changes have been saved successfully.
                </AlertDescription>
              </Alert>

              <Alert className="bg-red-50 border-red-200">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertTitle className="text-red-800">Error</AlertTitle>
                <AlertDescription className="text-red-700">
                  There was a problem processing your request.
                </AlertDescription>
              </Alert>

              <div className="flex gap-4">
                <Badge className="bg-[#b8956a] hover:bg-[#9d7d54]">New</Badge>
                <Badge variant="outline" className="border-[#b8956a] text-[#b8956a]">Premium</Badge>
                <Badge variant="secondary" className="bg-[#f5f3f0] text-[#4a4a4a]">Sold Out</Badge>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}