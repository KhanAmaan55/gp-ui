import { useState, useEffect } from 'react';
import { IoMail } from "react-icons/io5";
import { LuActivity } from "react-icons/lu";
import { IoMdFlame } from "react-icons/io";
import { HiMiniShieldCheck } from "react-icons/hi2";
import { FiEdit2 } from "react-icons/fi";
import { BiCricketBall, BiBasketball, BiFootball } from "react-icons/bi";
import { PiVolleyball, PiTennisBallDuotone } from 'react-icons/pi';
import { MdOutlineSportsCricket, MdSportsRugby, MdSportsSoccer } from 'react-icons/md';
import { TbBallAmericanFootball } from "react-icons/tb";
import { GiCricketBat } from "react-icons/gi";

const FloatingIcon = ({ Icon, initialTop, initialLeft, delay }) => {
  const [position, setPosition] = useState({ top: initialTop, left: initialLeft });
  const [isMoving, setIsMoving] = useState(false);

  const handleClick = () => {
    if (isMoving) return;
    setIsMoving(true);
    const newTop = Math.random() * 80 + 10;
    const newLeft = Math.random() * 80 + 10;
    setPosition({ top: `${newTop}%`, left: `${newLeft}%` });
    setTimeout(() => setIsMoving(false), 1000);
  };

  return (
    <div
      className={`absolute cursor-pointer transition-all duration-1000 ease-in-out animate-bounce ${
        isMoving ? 'scale-125' : ''
      }`}
      style={{
        top: position.top,
        left: position.left,
        animationDuration: `${delay}s`,
      }}
      onClick={handleClick}
    >
      <Icon className="w-8 h-8 text-[#0D141C] opacity-80 hover:opacity-100 transition-all" />
    </div>
  );
};

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(true);

  const floatingIcons = [
    { Icon: BiCricketBall, top: "10%", left: "15%", delay: 3 },
    { Icon: PiVolleyball, top: "20%", left: "40%", delay: 4 },
    { Icon: BiBasketball, top: "30%", left: "30%", delay: 3.5 },
    { Icon: TbBallAmericanFootball, top: "35%", left: "70%", delay: 3.5 },
    { Icon: BiFootball, top: "15%", left: "85%", delay: 4.2 },
    { Icon: PiTennisBallDuotone, top: "55%", left: "25%", delay: 3.8 },
    { Icon: MdSportsRugby, top: "40%", left: "10%", delay: 4.5 },
    { Icon: MdSportsSoccer, top: "85%", left: "30%", delay: 3.9 },
  ];

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setStep(2);
    setTimer(30);
    setCanResend(false);
    setIsLoading(false);
  };

  const handleResendOTP = () => {
    if (canResend) {
      setTimer(30);
      setCanResend(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  const handleEditEmail = () => {
    setStep(1);
    setOtp('');
    setTimer(0);
    setCanResend(true);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F8FAFC] overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-[#E7EDF4] rounded-full opacity-60 blur-3xl animate-pulse"></div>
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-[#E7EDF4] rounded-full opacity-60 blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        
        {floatingIcons.map((icon, index) => (
          <FloatingIcon
            key={index}
            Icon={icon.Icon}
            initialTop={icon.top}
            initialLeft={icon.left}
            delay={icon.delay}
          />
        ))}
      </div>

      {/* Login container */}
      <div className="relative w-full max-w-md p-6 mx-4">
        <div 
          className="absolute inset-0 bg-[#0D141C] rounded-3xl transform rotate-3 opacity-10"
          style={{
            top: '-5px',
            left: '-5px',
            right: '-5px',
            bottom: '-5px'
          }}
        ></div>
        
        <div 
          className="absolute inset-0 bg-[#0D141C] rounded-3xl transform -rotate-3 opacity-10"
          style={{
            top: '-5px',
            left: '-5px',
            right: '-5px',
            bottom: '-5px'
          }}
        ></div>

        {/* Main form card */}
        <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-[#E7EDF4]">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block mb-4 transform hover:scale-110 transition-transform">
              <LuActivity className="w-14 h-14 text-[#0D141C] animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold text-[#0D141C] mb-2">Get In The Game</h2>
            <p className="text-lg text-[#49739C]">
              {step === 1 ? "Enter your email to get started" : "Check your inbox for the verification code"}
            </p>
          </div>

          <form onSubmit={step === 1 ? handleSendOTP : handleVerifyOTP} className="space-y-6">
            {step === 1 ? (
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <IoMail className="h-6 w-6 text-[#49739C]" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg bg-[#E7EDF4] border border-transparent rounded-xl focus:outline-none focus:border-[#0D141C] text-[#0D141C] placeholder-[#49739C] transition-all transform hover:translate-x-1"
                  placeholder="Enter your email"
                  required
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-[#E7EDF4] p-3 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <IoMail className="h-5 w-5 text-[#49739C]" />
                    <span className="text-base text-[#49739C] font-medium">{email}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleEditEmail}
                    className="flex items-center space-x-1 text-[#49739C] hover:text-[#0D141C] transition-colors p-1 rounded-lg hover:bg-[#F8FAFC]"
                  >
                    <FiEdit2 className="h-4 w-4" />
                    <span className="text-sm font-medium">Edit</span>
                  </button>
                </div>
                
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <HiMiniShieldCheck className="h-6 w-6 text-[#49739C]" />
                  </div>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-lg bg-[#E7EDF4] border border-transparent rounded-xl focus:outline-none focus:border-[#0D141C] text-[#0D141C] placeholder-[#49739C] transition-all transform hover:translate-x-1"
                    placeholder="Enter verification code"
                    maxLength={6}
                    required
                  />
                </div>
                
                <div className="flex justify-between items-center px-2">
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={!canResend}
                    className={`text-base underline font-medium ${
                      canResend 
                        ? 'text-[#49739C] hover:text-[#0D141C] cursor-pointer' 
                        : 'text-[#49739C] opacity-50 cursor-not-allowed'
                    } transition-colors`}
                  >
                    Resend verification code
                  </button>
                  {timer > 0 && (
                    <span className="text-base font-medium text-[#49739C]">
                      {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                    </span>
                  )}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#0D141C] text-white text-lg font-semibold rounded-xl hover:bg-[#0D141C]/90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 relative"
            >
              <span className={`inline-flex items-center justify-center ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                {step === 1 ? "Send Verification Code" : "Let's Play"}
                <GiCricketBat className="ml-2 w-5 h-5" />
              </span>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </button>

            <p className="text-center text-base text-[#49739C]">
              New to the team?{' '}
              <a href="#" className="text-[#0D141C] hover:text-[#0D141C]/80 transition-colors font-semibold">
                Join now
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;