export default function MarqueeTicker() {
  const items = [
    'RESTAURANTS',
    'CAFES',
    'CLOUD KITCHENS',
    'GAMING ZONES',
    'HOSPITALITY',
    'FOOD COURTS',
  ];

  // Repeat items list to make sure there are enough items to fill and loop seamlessly
  const repeatedItems = [...items, ...items, ...items, ...items, ...items, ...items];

  return (
    <div className="marquee-container">
      <div className="marquee-track">
        {repeatedItems.map((item, idx) => (
          <div key={idx} className="marquee-item">
            {item} <span style={{ marginLeft: '2rem', color: 'rgba(200, 169, 110, 0.4)' }}>·</span>
          </div>
        ))}
      </div>
    </div>
  );
}
