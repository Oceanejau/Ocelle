import React from 'react';
import { View } from 'react-native';
import Svg, { Polygon, Line, Text as SvgText } from 'react-native-svg';

type Branch = { label: string; value: number }; // value: 0-100

type Props = {
  branches: Branch[];
  size?: number;
};

function branchToPoint(index: number, total: number, value: number, radius: number, center: number) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  const distance = (value / 100) * radius;
  return {
    x: center + distance * Math.cos(angle),
    y: center + distance * Math.sin(angle),
  };
}

export default function RadarChart({ branches, size = 260 }: Props) {
  const center = size / 2;
  const radius = size / 2 - 30;

  const points = branches
    .map((b, i) => branchToPoint(i, branches.length, b.value, radius, center))
    .map((p) => `${p.x},${p.y}`)
    .join(' ');

  return (
    <View>
      <Svg width={size} height={size}>
        {branches.map((_, i) => {
          const edge = branchToPoint(i, branches.length, 100, radius, center);
          return <Line key={i} x1={center} y1={center} x2={edge.x} y2={edge.y} stroke="#ddd" strokeWidth={1} />;
        })}

        <Polygon points={points} fill="rgba(46,204,113,0.35)" stroke="#2ecc71" strokeWidth={2} />

        {branches.map((b, i) => {
          const labelPoint = branchToPoint(i, branches.length, 118, radius, center);
          return (
            <SvgText key={b.label} x={labelPoint.x} y={labelPoint.y} fontSize={12} textAnchor="middle" fill="#555">
              {b.label}
            </SvgText>
          );
        })}
      </Svg>
    </View>
  );
}
