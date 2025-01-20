const { useState } = React;
const { Camera, Home, Building2, Cloud, Sun, ExternalLink, ShoppingCart, Eye, Shield, Wifi, Moon } = lucide;

function CCTVRecommender() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [country, setCountry] = useState('US');

  // Exchange rates data
  const exchangeRates = {
    US: { symbol: '$', rate: 1 },
    UK: { symbol: '£', rate: 0.79 },
    EU: { symbol: '€', rate: 0.91 },
    IN: { symbol: '₹', rate: 82.5 },
    AU: { symbol: 'A$', rate: 1.52 },
  };

  // Questions data
  const questions = [
    {
      id: 'country',
      text: 'Select your country/region:',
      options: [
        { value: 'US', label: 'United States (USD)', icon: Home },
        { value: 'UK', label: 'United Kingdom (GBP)', icon: Home },
        { value: 'EU', label: 'Europe (EUR)', icon: Home },
        { value: 'IN', label: 'India (INR)', icon: Home },
        { value: 'AU', label: 'Australia (AUD)', icon: Home }
      ]
    },
    {
      id: 'location',
      text: 'Where will you install the CCTV camera?',
      options: [
        { value: 'indoor', label: 'Indoor', icon: Home },
        { value: 'outdoor', label: 'Outdoor', icon: Sun },
        { value: 'both', label: 'Both Indoor & Outdoor', icon: Building2 }
      ]
    },
    {
      id: 'purpose',
      text: 'What is your primary purpose?',
      options: [
        { value: 'security', label: 'Home Security', icon: Shield },
        { value: 'monitoring', label: 'Baby/Pet Monitoring', icon: Eye },
        { value: 'business', label: 'Business Surveillance', icon: Building2 }
      ]
    },
    {
      id: 'resolution',
      text: 'What video quality do you need?',
      options: [
        { value: '1080p', label: '1080p HD', icon: Camera },
        { value: '2k', label: '2K Ultra HD', icon: Camera },
        { value: '4k', label: '4K Professional', icon: Camera }
      ]
    },
    {
      id: 'nightVision',
      text: 'Do you need night vision?',
      options: [
        { value: 'basic', label: 'Basic Night Vision', icon: Moon },
        { value: 'color', label: 'Color Night Vision', icon: Moon },
        { value: 'none', label: 'Not Required', icon: Sun }
      ]
    },
    {
      id: 'connectivity',
      text: 'What type of connectivity do you prefer?',
      options: [
        { value: 'wifi', label: 'WiFi Only', icon: Wifi },
        { value: 'wired', label: 'Wired/PoE', icon: Building2 },
        { value: 'both', label: 'Both Options', icon: Cloud }
      ]
    },
    {
      id: 'storage',
      text: 'What type of storage do you prefer?',
      options: [
        { value: 'local', label: 'Local Storage (SD Card/DVR)', icon: Camera },
        { value: 'cloud', label: 'Cloud Storage', icon: Cloud },
        { value: 'both', label: 'Both Local & Cloud', icon: Building2 }
      ]
    },
    {
      id: 'budget',
      text: 'What is your budget range?',
      options: [
        { value: 'budget', label: 'Economic (Under $100)', icon: Camera },
        { value: 'midrange', label: 'Mid-Range ($100-$300)', icon: Camera },
        { value: 'premium', label: 'Premium (Above $300)', icon: Camera }
      ]
    }
  ];

  // Product recommendations data
  const recommendations = {
    // Budget Indoor Options
    'indoor-security-1080p-basic-wifi-local-budget': {
      name: 'Wyze Cam v3',
      features: [
        '1080p HD Video',
        'Basic Night Vision',
        'Two-way Audio',
        'Local SD Card Storage',
        'Motion Detection',
        'Works with Alexa'
      ],
      basePrice: 35.98,
      link: 'YOUR-AFFILIATE-LINK-HERE-1'
    },
    // Premium Outdoor Options
    'outdoor-security-2k-color-both-cloud-premium': {
      name: 'Arlo Pro 4',
      features: [
        '2K HDR Video',
        'Color Night Vision',
        'Built-in Spotlight',
        '180° viewing angle',
        'Smart AI Detection',
        'Wire-free Installation'
      ],
      basePrice: 399.99,
      link: 'YOUR-AFFILIATE-LINK-HERE-2'
    },
    // Business Solutions
    'both-business-4k-color-wired-both-premium': {
      name: 'Reolink RLC-811A',
      features: [
        '4K Ultra HD',
        'Person/Vehicle Detection',
        'Color Night Vision',
        'Local & Cloud Storage',
        'PoE Installation',
        'Business-grade Security'
      ],
      basePrice: 259.99,
      link: 'YOUR-AFFILIATE-LINK-HERE-3'
    },
    // Monitoring Solutions
    'indoor-monitoring-1080p-basic-wifi-cloud-midrange': {
      name: 'Ring Indoor Cam',
      features: [
        '1080p HD Video',
        'Two-way Talk',
        'Night Vision',
        'Cloud Storage',
        'Pet/Baby Monitoring',
        'Mobile App Access'
      ],
      basePrice: 59.99,
      link: 'YOUR-AFFILIATE-LINK-HERE-4'
    }
  };

  // Default recommendation for unmatched combinations
  const defaultRecommendation = {
    name: 'Wyze Cam v3',
    features: [
      '1080p HD',
      'Night Vision',
      'Two-way Audio',
      'Local Storage',
      'Motion Detection'
    ],
    basePrice: 35.98,
    link: 'YOUR-AFFILIATE-LINK-HERE-1'
  };

  // Format price according to country
  const formatPrice = (basePrice, countryCode) => {
    const { symbol, rate } = exchangeRates[countryCode];
    const convertedPrice = (basePrice * rate).toFixed(2);
    return `${symbol}${convertedPrice}`;
  };

  // Handle user's answer
  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    if (questionId === 'country') {
      setCountry(value);
    }
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  // Get recommendation based on answers
  const getRecommendation = () => {
    const key = `${answers.location}-${answers.purpose}-${answers.resolution}-${answers.nightVision}-${answers.connectivity}-${answers.storage}-${answers.budget}`;
    return recommendations[key] || defaultRecommendation;
  };

  // Restart the questionnaire
  const restart = () => {
    setStep(0);
    setAnswers({});
    setShowResult(false);
  };

  // Analytics tracking
  const trackRecommendation = (recommendation) => {
    if (window.gtag) {
      window.gtag('event', 'get_recommendation', {
        'event_category': 'CCTV Tool',
        'event_label': recommendation.name,
        'value': recommendation.basePrice
      });
    }
  };

  // Results display
  if (showResult) {
    const recommendation = getRecommendation();
    trackRecommendation(recommendation);

    return (
      <div className="card">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Recommended CCTV Camera</h2>
        </div>
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">{recommendation.name}</h3>
            <p className="text-lg font-semibold text-green-600">
              {formatPrice(recommendation.basePrice, country)}
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">Key Features:</h4>
            <ul className="feature-list">
              {recommendation.features.map((feature, index) => (
                <li key={index} className="text-gray-700">{feature}</li>
              ))}
            </ul>
          </div>
          
          <a 
            href={recommendation.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
          >
            <button className="button button-primary">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Buy Now at Best Price
              <ExternalLink className="w-4 h-4 ml-2" />
            </button>
          </a>

          <button 
            onClick={restart}
            className="button mt-4"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  // Questionnaire display
  return (
    <div className="card">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Find Your Perfect CCTV Camera</h2>
      </div>
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">{questions[step].text}</h3>
        <div className="space-y-4">
          {questions[step].options.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.value}
                onClick={() => handleAnswer(questions[step].id, option.value)}
                className="button"
              >
                <Icon className="w-6 h-6 mr-4" />
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>
        <div className="text-sm text-gray-500 text-center">
          Question {step + 1} of {questions.length}
        </div>
      </div>
    </div>
  );
}

// Render the app
ReactDOM.render(<CCTVRecommender />, document.getElementById('root'));
