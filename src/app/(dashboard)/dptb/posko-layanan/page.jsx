import React from 'react';

import Card from './Card';

const data = [
  { region: 'Sulawesi Selatan', city: 'Makassar', phone: '2147438647', address: 'Jl. Perumnas Raya, Manggala, Kec. Manggala' },
  { region: 'Sulawesi Selatan', city: 'Gowa', phone: '2147438647', address: 'Jl. Bumi Harapan, Kec. Wara Sel' },
  { region: 'Sulawesi Selatan', city: 'Bantaeng', phone: '2147438647', address: 'Takkalala, Kec. Wara Sel' },

  // Add more data as needed
];

export default function Page() {
  return (
    <div style={{ maxWidth: '1200px', margin: 'auto', padding: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '20px' }}>
        {data.map((item, index) => (
          <Card
            key={index}
            region={item.region}
            city={item.city}
            phone={item.phone}
            address={item.address}
          />
        ))}
      </div>
    </div>
  );
}
