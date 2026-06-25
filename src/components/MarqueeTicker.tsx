export default function MarqueeTicker() {
  const items = [
    { text: 'VYOM NEXUS', highlight: true },
    { text: 'IDEAS INTO ACTION', highlight: true },
    { text: 'RESTAURANTS', highlight: false },
    { text: 'CAFES', highlight: false },
    { text: 'CLOUD KITCHENS', highlight: false },
    { text: 'GAMING ZONES', highlight: false },
    { text: 'PLAY ZONES', highlight: false },
    { text: 'MARKETING', highlight: false },
  ];

  // Repeat items list to make sure there are enough items to fill and loop seamlessly
  const repeatedItems = [...items, ...items, ...items, ...items, ...items, ...items];

  return (
    <div className="marquee-container">
      <div className="marquee-track">
        {repeatedItems.map((item, idx) => (
          <div 
            key={idx} 
            className={`marquee-item ${item.highlight ? 'marquee-highlight' : ''}`}
          >
            {item.text} <span style={{ marginLeft: '2.5rem', color: 'rgba(200, 169, 110, 0.35)' }}>·</span>
          </div>
        ))}
      </div>
    </div>
  );
}
