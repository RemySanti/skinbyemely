/**
 * Square Booking Component
 * Embedded appointment booking with real-time availability
 */

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Calendar, Clock, User, Mail, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { bookingsService, customersService } from '../services/squareService';
import { isSquareConfigured } from '../config/square';

interface SquareBookingProps {
  serviceId?: string;
  serviceName?: string;
  serviceDuration?: number;
  onBookingComplete?: (bookingId: string) => void;
}

export function SquareBooking({
  serviceId = 'custom-facial',
  serviceName = 'Custom Luxury Facial',
  serviceDuration = 90,
  onBookingComplete,
}: SquareBookingProps) {
  const [step, setStep] = useState<'availability' | 'details' | 'confirm' | 'success'>('availability');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Customer details
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  // Check if Square is configured
  const squareConfigured = isSquareConfigured();

  /**
   * Load available time slots for selected date
   */
  const loadAvailability = async (date: string) => {
    setLoading(true);
    setError(null);

    try {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const slots = await bookingsService.searchAvailability(
        serviceId,
        startOfDay.toISOString(),
        endOfDay.toISOString()
      );

      setAvailableSlots(slots.filter(slot => slot.available));
    } catch (err) {
      setError('Unable to load availability. Please try again.');
      console.error('Error loading availability:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle date selection
   */
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime('');
    loadAvailability(date);
  };

  /**
   * Handle time selection
   */
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  /**
   * Proceed to customer details
   */
  const proceedToDetails = () => {
    if (!selectedDate || !selectedTime) {
      setError('Please select a date and time');
      return;
    }
    setStep('details');
    setError(null);
  };

  /**
   * Submit booking
   */
  const submitBooking = async () => {
    if (!firstName || !lastName || !email) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create customer if needed
      const customer = await customersService.createCustomer({
        givenName: firstName,
        familyName: lastName,
        emailAddress: email,
        phoneNumber: phone,
      });

      // Create booking
      const booking = await bookingsService.createBooking({
        serviceVariationId: serviceId,
        startAt: selectedTime,
        customerId: customer?.id,
        customerNote: notes,
      });

      if (booking) {
        setStep('success');
        if (onBookingComplete) {
          onBookingComplete(booking.id);
        }
      } else {
        throw new Error('Booking creation failed');
      }
    } catch (err) {
      setError('Unable to complete booking. Please try calling us directly.');
      console.error('Error creating booking:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Generate next 14 days for date selection
   */
  const generateDateOptions = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        }),
      });
    }
    
    return dates;
  };

  /**
   * Format time slot for display
   */
  const formatTimeSlot = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Show configuration notice if Square not set up
  if (!squareConfigured) {
    return (
      <div className="bg-[#faf8f5] p-8 border border-[#b8956a]/15 rounded">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="w-6 h-6 text-[#b8956a]" />
          <h3 className="text-lg font-serif text-[#2c2c2c]">
            Booking System Setup Required
          </h3>
        </div>
        <p className="text-[#6b6b6b] mb-6 leading-relaxed">
          Square API integration is not yet configured. Please add your Square API credentials
          to enable online booking functionality.
        </p>
        <a
          href="https://book.squareup.com/appointments/f7dcst2ljp85dq/location/LMVSQK9C6PR4T/services?buttonTextColor=ffffff&color=000000&locale=en&referrer=so"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="btn-bronze px-8 py-4 rounded">
            Book via Square (External)
          </Button>
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#b8956a]/15 rounded overflow-hidden">
      {/* Service Header */}
      <div className="bg-[#faf8f5] p-6 border-b border-[#b8956a]/15">
        <h3 className="text-xl font-serif text-[#2c2c2c] mb-2">{serviceName}</h3>
        <div className="flex items-center gap-4 text-sm text-[#6b6b6b]">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {serviceDuration} minutes
          </div>
        </div>
      </div>

      {/* Booking Steps */}
      <div className="p-8">
        {/* Step 1: Select Date & Time */}
        {step === 'availability' && (
          <div>
            <h4 className="text-lg font-serif text-[#2c2c2c] mb-6">
              Select Date & Time
            </h4>

            {/* Date Selection */}
            <div className="mb-8">
              <Label className="mb-3 block text-sm tracking-wider text-[#b8956a]">
                SELECT DATE
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {generateDateOptions().map((date) => (
                  <button
                    key={date.value}
                    onClick={() => handleDateSelect(date.value)}
                    className={`
                      p-4 border rounded text-sm transition-all
                      ${selectedDate === date.value
                        ? 'border-[#b8956a] bg-[#faf8f5] text-[#2c2c2c]'
                        : 'border-[#b8956a]/15 text-[#6b6b6b] hover:border-[#b8956a]/30'
                      }
                    `}
                  >
                    {date.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            {selectedDate && (
              <div className="mb-8">
                <Label className="mb-3 block text-sm tracking-wider text-[#b8956a]">
                  SELECT TIME
                </Label>
                
                {loading ? (
                  <div className="text-center py-8 text-[#6b6b6b]">
                    Loading available times...
                  </div>
                ) : availableSlots.length > 0 ? (
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {availableSlots.map((slot, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleTimeSelect(slot.start_at)}
                        className={`
                          p-3 border rounded text-sm transition-all
                          ${selectedTime === slot.start_at
                            ? 'border-[#b8956a] bg-[#faf8f5] text-[#2c2c2c]'
                            : 'border-[#b8956a]/15 text-[#6b6b6b] hover:border-[#b8956a]/30'
                          }
                        `}
                      >
                        {formatTimeSlot(slot.start_at)}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-[#6b6b6b]">
                    No available times for this date
                  </div>
                )}
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                {error}
              </div>
            )}

            <Button
              onClick={proceedToDetails}
              disabled={!selectedDate || !selectedTime}
              className="w-full btn-bronze py-4 rounded"
            >
              Continue to Details
            </Button>
          </div>
        )}

        {/* Step 2: Customer Details */}
        {step === 'details' && (
          <div>
            <h4 className="text-lg font-serif text-[#2c2c2c] mb-6">
              Your Information
            </h4>

            <div className="space-y-6 mb-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName" className="mb-2 block text-sm tracking-wider text-[#b8956a]">
                    FIRST NAME *
                  </Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="border-[#b8956a]/30 focus:border-[#b8956a]"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="lastName" className="mb-2 block text-sm tracking-wider text-[#b8956a]">
                    LAST NAME *
                  </Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="border-[#b8956a]/30 focus:border-[#b8956a]"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="mb-2 block text-sm tracking-wider text-[#b8956a]">
                  EMAIL ADDRESS *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-[#b8956a]/30 focus:border-[#b8956a]"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone" className="mb-2 block text-sm tracking-wider text-[#b8956a]">
                  PHONE NUMBER
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(914) 299-7739"
                  className="border-[#b8956a]/30 focus:border-[#b8956a]"
                />
              </div>

              <div>
                <Label htmlFor="notes" className="mb-2 block text-sm tracking-wider text-[#b8956a]">
                  SPECIAL REQUESTS OR NOTES
                </Label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-[#b8956a]/30 rounded focus:border-[#b8956a] focus:outline-none"
                  placeholder="Any skin concerns or questions?"
                />
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <Button
                onClick={() => setStep('availability')}
                variant="outline"
                className="flex-1 py-4 rounded border-[#b8956a]/30"
              >
                Back
              </Button>
              <Button
                onClick={submitBooking}
                disabled={loading}
                className="flex-1 btn-bronze py-4 rounded"
              >
                {loading ? 'Confirming...' : 'Confirm Booking'}
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 'success' && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <h4 className="text-2xl font-serif text-[#2c2c2c] mb-4">
              Booking Confirmed!
            </h4>
            
            <p className="text-[#6b6b6b] mb-6 leading-relaxed">
              Your appointment for <strong>{serviceName}</strong> has been confirmed.<br />
              We've sent a confirmation email to <strong>{email}</strong>.
            </p>

            <div className="bg-[#faf8f5] p-6 rounded mb-8 text-left">
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="w-5 h-5 text-[#b8956a]" />
                <span className="text-[#4a4a4a]">
                  {new Date(selectedDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#b8956a]" />
                <span className="text-[#4a4a4a]">
                  {formatTimeSlot(selectedTime)}
                </span>
              </div>
            </div>

            <p className="text-sm text-[#6b6b6b] mb-6">
              Location: 1111 Oakfield Dr, Brandon, FL 33511
            </p>

            <Button
              onClick={() => window.location.href = '/'}
              className="btn-bronze px-8 py-4 rounded"
            >
              Return to Home
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}