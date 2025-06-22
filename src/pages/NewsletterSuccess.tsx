
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NewsletterSuccessProps {
  onBack: () => void;
  email: string;
}

const NewsletterSuccess = ({ onBack, email }: NewsletterSuccessProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-gray-700 hover:text-amber-600"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to BookNest
            </Button>
            
            <div className="flex items-center space-x-3">
              <div className="text-2xl">📚</div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BookNest</h1>
                <p className="text-xs text-amber-600">Where Stories Nestle</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Success Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-8" />
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Our Newsletter! 🎉
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Thank you for subscribing! You'll now receive all our latest book recommendations, 
            exclusive deals, and literary news directly in your inbox.
          </p>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <Mail className="h-6 w-6 mr-2" />
                Subscription Confirmed
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-amber-50 p-4 rounded-lg">
                <p className="text-amber-800 font-medium">📧 Subscribed Email:</p>
                <p className="text-amber-900 text-lg">{email}</p>
              </div>
              
              <div className="space-y-3 text-left">
                <h3 className="font-semibold text-gray-900">What to expect:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Weekly book recommendations tailored to your interests
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Exclusive discounts and early access to sales
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Author interviews and literary news
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    New release notifications
                  </li>
                </ul>
              </div>

              <div className="pt-4">
                <Button 
                  onClick={onBack}
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                >
                  Continue Browsing Books
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSuccess;
