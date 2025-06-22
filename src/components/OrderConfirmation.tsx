
import { Check, Download, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OrderConfirmationProps {
  orderDetails: {
    orderId: string;
    book: {
      title: string;
      author: string;
      price: number;
      image: string;
    };
    customerDetails: {
      name: string;
      email: string;
      phone: string;
      address: string;
    };
    paymentMethod: string;
    orderDate: string;
    total: number;
  };
  onBackToHome: () => void;
}

const OrderConfirmation = ({ orderDetails, onBackToHome }: OrderConfirmationProps) => {
  const handleDownloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    console.log("Downloading receipt for order:", orderDetails.orderId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
          <p className="text-lg text-gray-600">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </div>

        {/* Order Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Order ID:</span>
                <p className="font-semibold">{orderDetails.orderId}</p>
              </div>
              <div>
                <span className="text-gray-600">Order Date:</span>
                <p className="font-semibold">{orderDetails.orderDate}</p>
              </div>
              <div>
                <span className="text-gray-600">Payment Method:</span>
                <p className="font-semibold capitalize">{orderDetails.paymentMethod}</p>
              </div>
              <div>
                <span className="text-gray-600">Total Amount:</span>
                <p className="font-semibold text-green-600">${orderDetails.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Book Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Book Ordered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <img
                src={orderDetails.book.image}
                alt={orderDetails.book.title}
                className="w-16 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{orderDetails.book.title}</h3>
                <p className="text-sm text-gray-600">by {orderDetails.book.author}</p>
                <p className="text-lg font-bold text-amber-600">${orderDetails.book.price}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Shipping Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> {orderDetails.customerDetails.name}</p>
              <p><strong>Email:</strong> {orderDetails.customerDetails.email}</p>
              <p><strong>Phone:</strong> {orderDetails.customerDetails.phone}</p>
              <p><strong>Address:</strong> {orderDetails.customerDetails.address}</p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="outline"
            onClick={handleDownloadReceipt}
            className="flex-1"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Receipt
          </Button>
          <Button
            onClick={onBackToHome}
            className="flex-1 bg-amber-600 hover:bg-amber-700"
          >
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">What's Next?</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• You'll receive an email confirmation shortly</li>
            <li>• Your book will be processed within 1-2 business days</li>
            <li>• Track your order in the Order History section</li>
            <li>• Expected delivery: 3-5 business days</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
