"use client";

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const page = () => {
  const [selectedCountry, setSelectedCountry] = useState('USA');
  const [gpa, setGpa] = useState('');
  const [ielts, setIelts] = useState('');
  const [tuitionRange, setTuitionRange] = useState([0, 60000]);
  const [isFiltering, setIsFiltering] = useState(false);
  const router = useRouter();

  // Check if any filter is active
  useEffect(() => {
    setIsFiltering(gpa !== '' || ielts !== '' || tuitionRange[1] < 60000);
  }, [gpa, ielts, tuitionRange]);
  
  const countries = [
    { name: 'USA', code: 'us' },
    { name: 'UK', code: 'gb' },
    { name: 'Australia', code: 'au' },
    { name: 'Canada', code: 'ca' },
    { name: 'China', code: 'cn' },
    { name: 'Japan', code: 'jp' },
    { name: 'Italy', code: 'it' },
    { name: 'Spain', code: 'es' },
    { name: 'Germany', code: 'de' },
    { name: 'France', code: 'fr' },
    { name: 'Netherlands', code: 'nl' },
    { name: 'Sweden', code: 'se' },
  ];

  const universitiesByCountry: { [key: string]: Array<{ name: string; type: string; location: string; image: string; minGpa: number; minIelts: number; tuition: number }> } = {
    USA: [
      { name: 'Harvard University', type: 'Private university', location: 'Cambridge, USA', image: 'https://picsum.photos/seed/harvard/800/600', minGpa: 3.8, minIelts: 7.5, tuition: 55000 },
      { name: 'Stanford University', type: 'Private university', location: 'Stanford, USA', image: 'https://picsum.photos/seed/stanford/800/600', minGpa: 3.7, minIelts: 7.0, tuition: 52000 },
      { name: 'MIT', type: 'Private university', location: 'Cambridge, USA', image: 'https://picsum.photos/seed/mit/800/600', minGpa: 3.9, minIelts: 7.5, tuition: 54000 },
      { name: 'Yale University', type: 'Private university', location: 'New Haven, USA', image: 'https://picsum.photos/seed/yale/800/600', minGpa: 3.8, minIelts: 7.5, tuition: 56000 },
      { name: 'Princeton University', type: 'Private university', location: 'Princeton, USA', image: 'https://picsum.photos/seed/princeton/800/600', minGpa: 3.8, minIelts: 7.0, tuition: 53000 },
      { name: 'Columbia University', type: 'Private university', location: 'New York, USA', image: 'https://picsum.photos/seed/columbia/800/600', minGpa: 3.7, minIelts: 7.0, tuition: 51000 },
      { name: 'UC Berkeley', type: 'Public university', location: 'Berkeley, USA', image: 'https://picsum.photos/seed/berkeley/800/600', minGpa: 3.6, minIelts: 6.5, tuition: 42000 },
      { name: 'Cornell University', type: 'Private university', location: 'Ithaca, USA', image: 'https://picsum.photos/seed/cornell/800/600', minGpa: 3.7, minIelts: 7.0, tuition: 50000 },
    ],
    UK: [
      { name: 'University of Oxford', type: 'Public university', location: 'Oxford, UK', image: 'https://picsum.photos/seed/oxford/800/600', minGpa: 3.8, minIelts: 7.5, tuition: 32000 },
      { name: 'University of Cambridge', type: 'Public university', location: 'Cambridge, UK', image: 'https://picsum.photos/seed/cambridge/800/600', minGpa: 3.7, minIelts: 7.0, tuition: 30000 },
      { name: 'Imperial College London', type: 'Public university', location: 'London, UK', image: 'https://picsum.photos/seed/imperial/800/600', minGpa: 3.6, minIelts: 7.0, tuition: 35000 },
      { name: 'UCL', type: 'Public university', location: 'London, UK', image: 'https://picsum.photos/seed/ucl/800/600', minGpa: 3.6, minIelts: 7.0, tuition: 33000 },
      { name: 'University of Edinburgh', type: 'Public university', location: 'Edinburgh, UK', image: 'https://picsum.photos/seed/edinburgh/800/600', minGpa: 3.5, minIelts: 6.5, tuition: 28000 },
      { name: 'King\'s College London', type: 'Public university', location: 'London, UK', image: 'https://picsum.photos/seed/kings/800/600', minGpa: 3.5, minIelts: 6.5, tuition: 31000 },
      { name: 'LSE', type: 'Public university', location: 'London, UK', image: 'https://picsum.photos/seed/lse/800/600', minGpa: 3.7, minIelts: 7.0, tuition: 34000 },
      { name: 'University of Manchester', type: 'Public university', location: 'Manchester, UK', image: 'https://picsum.photos/seed/manchester/800/600', minGpa: 3.4, minIelts: 6.5, tuition: 26000 },
    ],
    Australia: [
      { name: 'University of Melbourne', type: 'Public university', location: 'Melbourne, Australia', image: 'https://picsum.photos/seed/melbourne/800/600', minGpa: 3.5, minIelts: 6.5, tuition: 28000 },
      { name: 'University of Sydney', type: 'Public university', location: 'Sydney, Australia', image: 'https://picsum.photos/seed/sydney/800/600', minGpa: 3.4, minIelts: 6.5, tuition: 27000 },
      { name: 'ANU', type: 'Public university', location: 'Canberra, Australia', image: 'https://picsum.photos/seed/anu/800/600', minGpa: 3.6, minIelts: 6.5, tuition: 29000 },
      { name: 'UNSW Sydney', type: 'Public university', location: 'Sydney, Australia', image: 'https://picsum.photos/seed/unsw/800/600', minGpa: 3.5, minIelts: 6.5, tuition: 28500 },
      { name: 'University of Queensland', type: 'Public university', location: 'Brisbane, Australia', image: 'https://picsum.photos/seed/queensland/800/600', minGpa: 3.4, minIelts: 6.5, tuition: 26500 },
      { name: 'Monash University', type: 'Public university', location: 'Melbourne, Australia', image: 'https://picsum.photos/seed/monash/800/600', minGpa: 3.3, minIelts: 6.5, tuition: 25000 },
      { name: 'University of Adelaide', type: 'Public university', location: 'Adelaide, Australia', image: 'https://picsum.photos/seed/adelaide/800/600', minGpa: 3.2, minIelts: 6.0, tuition: 24000 },
      { name: 'UTS', type: 'Public university', location: 'Sydney, Australia', image: 'https://picsum.photos/seed/uts/800/600', minGpa: 3.3, minIelts: 6.5, tuition: 26000 },
    ],
    Canada: [
      { name: 'University of Toronto', type: 'Public university', location: 'Toronto, Canada', image: 'https://picsum.photos/seed/toronto/800/600', minGpa: 3.5, minIelts: 6.5, tuition: 25000 },
      { name: 'UBC', type: 'Public university', location: 'Vancouver, Canada', image: 'https://picsum.photos/seed/ubc/800/600', minGpa: 3.3, minIelts: 6.5, tuition: 24000 },
      { name: 'McGill University', type: 'Public university', location: 'Montreal, Canada', image: 'https://picsum.photos/seed/mcgill/800/600', minGpa: 3.4, minIelts: 6.5, tuition: 22000 },
      { name: 'McMaster University', type: 'Public university', location: 'Hamilton, Canada', image: 'https://picsum.photos/seed/mcmaster/800/600', minGpa: 3.2, minIelts: 6.5, tuition: 23000 },
      { name: 'University of Alberta', type: 'Public university', location: 'Edmonton, Canada', image: 'https://picsum.photos/seed/alberta/800/600', minGpa: 3.3, minIelts: 6.5, tuition: 21000 },
      { name: 'University of Montreal', type: 'Public university', location: 'Montreal, Canada', image: 'https://picsum.photos/seed/montreal/800/600', minGpa: 3.2, minIelts: 6.0, tuition: 20000 },
      { name: 'University of Waterloo', type: 'Public university', location: 'Waterloo, Canada', image: 'https://picsum.photos/seed/waterloo/800/600', minGpa: 3.4, minIelts: 6.5, tuition: 24500 },
      { name: 'Western University', type: 'Public university', location: 'London, Canada', image: 'https://picsum.photos/seed/western/800/600', minGpa: 3.2, minIelts: 6.5, tuition: 22500 },
    ],
    China: [
      { name: 'Tsinghua University', type: 'Public university', location: 'Beijing, China', image: 'https://picsum.photos/seed/tsinghua/800/600', minGpa: 3.7, minIelts: 6.5, tuition: 15000 },
      { name: 'Peking University', type: 'Public university', location: 'Beijing, China', image: 'https://picsum.photos/seed/peking/800/600', minGpa: 3.7, minIelts: 6.5, tuition: 15000 },
      { name: 'Fudan University', type: 'Public university', location: 'Shanghai, China', image: 'https://picsum.photos/seed/fudan/800/600', minGpa: 3.6, minIelts: 6.0, tuition: 14000 },
      { name: 'Zhejiang University', type: 'Public university', location: 'Hangzhou, China', image: 'https://picsum.photos/seed/zhejiang/800/600', minGpa: 3.5, minIelts: 6.0, tuition: 13500 },
      { name: 'Shanghai Jiao Tong', type: 'Public university', location: 'Shanghai, China', image: 'https://picsum.photos/seed/sjtu/800/600', minGpa: 3.6, minIelts: 6.5, tuition: 14500 },
      { name: 'Nanjing University', type: 'Public university', location: 'Nanjing, China', image: 'https://picsum.photos/seed/nanjing/800/600', minGpa: 3.5, minIelts: 6.0, tuition: 13000 },
      { name: 'University of Science', type: 'Public university', location: 'Hefei, China', image: 'https://picsum.photos/seed/ustc/800/600', minGpa: 3.6, minIelts: 6.0, tuition: 13500 },
      { name: 'Wuhan University', type: 'Public university', location: 'Wuhan, China', image: 'https://picsum.photos/seed/wuhan/800/600', minGpa: 3.4, minIelts: 6.0, tuition: 12500 },
    ],
    Japan: [
      { name: 'University of Tokyo', type: 'Public university', location: 'Tokyo, Japan', image: 'https://picsum.photos/seed/utokyo/800/600', minGpa: 3.6, minIelts: 6.5, tuition: 18000 },
      { name: 'Kyoto University', type: 'Public university', location: 'Kyoto, Japan', image: 'https://picsum.photos/seed/kyoto/800/600', minGpa: 3.6, minIelts: 6.5, tuition: 18000 },
      { name: 'Osaka University', type: 'Public university', location: 'Osaka, Japan', image: 'https://picsum.photos/seed/osaka/800/600', minGpa: 3.5, minIelts: 6.0, tuition: 17000 },
      { name: 'Tohoku University', type: 'Public university', location: 'Sendai, Japan', image: 'https://picsum.photos/seed/tohoku/800/600', minGpa: 3.4, minIelts: 6.0, tuition: 16500 },
      { name: 'Tokyo Tech', type: 'Public university', location: 'Tokyo, Japan', image: 'https://picsum.photos/seed/titech/800/600', minGpa: 3.5, minIelts: 6.5, tuition: 17500 },
      { name: 'Nagoya University', type: 'Public university', location: 'Nagoya, Japan', image: 'https://picsum.photos/seed/nagoya/800/600', minGpa: 3.4, minIelts: 6.0, tuition: 16000 },
      { name: 'Hokkaido University', type: 'Public university', location: 'Sapporo, Japan', image: 'https://picsum.photos/seed/hokkaido/800/600', minGpa: 3.3, minIelts: 6.0, tuition: 15500 },
      { name: 'Keio University', type: 'Private university', location: 'Tokyo, Japan', image: 'https://picsum.photos/seed/keio/800/600', minGpa: 3.5, minIelts: 6.5, tuition: 20000 },
    ],
    Italy: [
      { name: 'Sapienza University', type: 'Public university', location: 'Rome, Italy', image: 'https://picsum.photos/seed/sapienza/800/600', minGpa: 3.2, minIelts: 6.0, tuition: 8000 },
      { name: 'University of Bologna', type: 'Public university', location: 'Bologna, Italy', image: 'https://picsum.photos/seed/bologna/800/600', minGpa: 3.2, minIelts: 6.0, tuition: 8000 },
      { name: 'Politecnico di Milano', type: 'Public university', location: 'Milan, Italy', image: 'https://picsum.photos/seed/polimi/800/600', minGpa: 3.3, minIelts: 6.0, tuition: 9000 },
      { name: 'University of Padua', type: 'Public university', location: 'Padua, Italy', image: 'https://picsum.photos/seed/padua/800/600', minGpa: 3.1, minIelts: 6.0, tuition: 7500 },
      { name: 'University of Milan', type: 'Public university', location: 'Milan, Italy', image: 'https://picsum.photos/seed/milan/800/600', minGpa: 3.2, minIelts: 6.0, tuition: 8500 },
      { name: 'University of Pisa', type: 'Public university', location: 'Pisa, Italy', image: 'https://picsum.photos/seed/pisa/800/600', minGpa: 3.1, minIelts: 5.5, tuition: 7000 },
      { name: 'University of Florence', type: 'Public university', location: 'Florence, Italy', image: 'https://picsum.photos/seed/florence/800/600', minGpa: 3.1, minIelts: 6.0, tuition: 7500 },
      { name: 'University of Turin', type: 'Public university', location: 'Turin, Italy', image: 'https://picsum.photos/seed/turin/800/600', minGpa: 3.0, minIelts: 5.5, tuition: 7000 },
    ],
    Spain: [
      { name: 'University of Barcelona', type: 'Public university', location: 'Barcelona, Spain', image: 'https://picsum.photos/seed/barcelona/800/600', minGpa: 3.2, minIelts: 6.0, tuition: 9000 },
      { name: 'Complutense University', type: 'Public university', location: 'Madrid, Spain', image: 'https://picsum.photos/seed/complutense/800/600', minGpa: 3.2, minIelts: 6.0, tuition: 8500 },
      { name: 'Autonomous Barcelona', type: 'Public university', location: 'Barcelona, Spain', image: 'https://picsum.photos/seed/uab/800/600', minGpa: 3.1, minIelts: 6.0, tuition: 8000 },
      { name: 'Autonomous Madrid', type: 'Public university', location: 'Madrid, Spain', image: 'https://picsum.photos/seed/uam/800/600', minGpa: 3.1, minIelts: 6.0, tuition: 8000 },
      { name: 'University of Valencia', type: 'Public university', location: 'Valencia, Spain', image: 'https://picsum.photos/seed/valencia/800/600', minGpa: 3.0, minIelts: 5.5, tuition: 7500 },
      { name: 'Pompeu Fabra University', type: 'Public university', location: 'Barcelona, Spain', image: 'https://picsum.photos/seed/upf/800/600', minGpa: 3.2, minIelts: 6.0, tuition: 9000 },
      { name: 'University of Granada', type: 'Public university', location: 'Granada, Spain', image: 'https://picsum.photos/seed/granada/800/600', minGpa: 3.0, minIelts: 5.5, tuition: 7000 },
      { name: 'University of Seville', type: 'Public university', location: 'Seville, Spain', image: 'https://picsum.photos/seed/seville/800/600', minGpa: 3.0, minIelts: 5.5, tuition: 7000 },
    ],
    Germany: [
      { name: 'TU Munich', type: 'Public university', location: 'Munich, Germany', image: 'https://picsum.photos/seed/tum/800/600', minGpa: 3.5, minIelts: 6.5, tuition: 5000 },
      { name: 'LMU Munich', type: 'Public university', location: 'Munich, Germany', image: 'https://picsum.photos/seed/lmu/800/600', minGpa: 3.4, minIelts: 6.5, tuition: 5000 },
      { name: 'Heidelberg University', type: 'Public university', location: 'Heidelberg, Germany', image: 'https://picsum.photos/seed/heidelberg/800/600', minGpa: 3.4, minIelts: 6.5, tuition: 5000 },
      { name: 'Humboldt Berlin', type: 'Public university', location: 'Berlin, Germany', image: 'https://picsum.photos/seed/humboldt/800/600', minGpa: 3.3, minIelts: 6.0, tuition: 5000 },
      { name: 'Free University Berlin', type: 'Public university', location: 'Berlin, Germany', image: 'https://picsum.photos/seed/fuberlin/800/600', minGpa: 3.3, minIelts: 6.0, tuition: 5000 },
      { name: 'RWTH Aachen', type: 'Public university', location: 'Aachen, Germany', image: 'https://picsum.photos/seed/rwth/800/600', minGpa: 3.4, minIelts: 6.5, tuition: 5000 },
      { name: 'University of Bonn', type: 'Public university', location: 'Bonn, Germany', image: 'https://picsum.photos/seed/bonn/800/600', minGpa: 3.2, minIelts: 6.0, tuition: 5000 },
      { name: 'University of Freiburg', type: 'Public university', location: 'Freiburg, Germany', image: 'https://picsum.photos/seed/freiburg/800/600', minGpa: 3.2, minIelts: 6.0, tuition: 5000 },
    ],
    France: [
      { name: 'Sorbonne University', type: 'Public university', location: 'Paris, France', image: 'https://picsum.photos/seed/sorbonne/800/600', minGpa: 3.4, minIelts: 6.5, tuition: 6000 },
      { name: 'École Polytechnique', type: 'Public university', location: 'Palaiseau, France', image: 'https://picsum.photos/seed/polytechnique/800/600', minGpa: 3.6, minIelts: 7.0, tuition: 10000 },
      { name: 'PSL University', type: 'Public university', location: 'Paris, France', image: 'https://picsum.photos/seed/psl/800/600', minGpa: 3.5, minIelts: 6.5, tuition: 6000 },
      { name: 'University of Paris', type: 'Public university', location: 'Paris, France', image: 'https://picsum.photos/seed/uparis/800/600', minGpa: 3.3, minIelts: 6.0, tuition: 5500 },
      { name: 'Sciences Po', type: 'Public university', location: 'Paris, France', image: 'https://picsum.photos/seed/sciencespo/800/600', minGpa: 3.5, minIelts: 6.5, tuition: 12000 },
      { name: 'ENS Paris', type: 'Public university', location: 'Paris, France', image: 'https://picsum.photos/seed/ens/800/600', minGpa: 3.7, minIelts: 7.0, tuition: 5500 },
      { name: 'University of Strasbourg', type: 'Public university', location: 'Strasbourg, France', image: 'https://picsum.photos/seed/strasbourg/800/600', minGpa: 3.2, minIelts: 6.0, tuition: 5000 },
      { name: 'University of Lyon', type: 'Public university', location: 'Lyon, France', image: 'https://picsum.photos/seed/lyon/800/600', minGpa: 3.2, minIelts: 6.0, tuition: 5000 },
    ],
    Netherlands: [
      { name: 'University of Amsterdam', type: 'Public university', location: 'Amsterdam, Netherlands', image: 'https://picsum.photos/seed/uva/800/600', minGpa: 3.4, minIelts: 6.5, tuition: 12000 },
      { name: 'Delft University', type: 'Public university', location: 'Delft, Netherlands', image: 'https://picsum.photos/seed/delft/800/600', minGpa: 3.5, minIelts: 6.5, tuition: 12500 },
      { name: 'Utrecht University', type: 'Public university', location: 'Utrecht, Netherlands', image: 'https://picsum.photos/seed/utrecht/800/600', minGpa: 3.3, minIelts: 6.0, tuition: 11000 },
      { name: 'Leiden University', type: 'Public university', location: 'Leiden, Netherlands', image: 'https://picsum.photos/seed/leiden/800/600', minGpa: 3.3, minIelts: 6.0, tuition: 11000 },
      { name: 'Erasmus University', type: 'Public university', location: 'Rotterdam, Netherlands', image: 'https://picsum.photos/seed/erasmus/800/600', minGpa: 3.4, minIelts: 6.5, tuition: 11500 },
      { name: 'Wageningen University', type: 'Public university', location: 'Wageningen, Netherlands', image: 'https://picsum.photos/seed/wageningen/800/600', minGpa: 3.3, minIelts: 6.0, tuition: 11000 },
      { name: 'Groningen University', type: 'Public university', location: 'Groningen, Netherlands', image: 'https://picsum.photos/seed/groningen/800/600', minGpa: 3.2, minIelts: 6.0, tuition: 10500 },
      { name: 'Maastricht University', type: 'Public university', location: 'Maastricht, Netherlands', image: 'https://picsum.photos/seed/maastricht/800/600', minGpa: 3.2, minIelts: 6.0, tuition: 10500 },
    ],
    Sweden: [
      { name: 'Lund University', type: 'Public university', location: 'Lund, Sweden', image: 'https://picsum.photos/seed/lund/800/600', minGpa: 3.3, minIelts: 6.5, tuition: 14000 },
      { name: 'Uppsala University', type: 'Public university', location: 'Uppsala, Sweden', image: 'https://picsum.photos/seed/uppsala/800/600', minGpa: 3.3, minIelts: 6.5, tuition: 14000 },
      { name: 'KTH Royal Institute', type: 'Public university', location: 'Stockholm, Sweden', image: 'https://picsum.photos/seed/kth/800/600', minGpa: 3.4, minIelts: 6.5, tuition: 15000 },
      { name: 'Stockholm University', type: 'Public university', location: 'Stockholm, Sweden', image: 'https://picsum.photos/seed/su/800/600', minGpa: 3.2, minIelts: 6.0, tuition: 13000 },
      { name: 'Gothenburg University', type: 'Public university', location: 'Gothenburg, Sweden', image: 'https://picsum.photos/seed/gothenburg/800/600', minGpa: 3.2, minIelts: 6.0, tuition: 13000 },
      { name: 'Karolinska Institute', type: 'Public university', location: 'Stockholm, Sweden', image: 'https://picsum.photos/seed/karolinska/800/600', minGpa: 3.5, minIelts: 6.5, tuition: 16000 },
      { name: 'Linköping University', type: 'Public university', location: 'Linköping, Sweden', image: 'https://picsum.photos/seed/linkoping/800/600', minGpa: 3.1, minIelts: 6.0, tuition: 12500 },
      { name: 'Chalmers University', type: 'Public university', location: 'Gothenburg, Sweden', image: 'https://picsum.photos/seed/chalmers/800/600', minGpa: 3.3, minIelts: 6.5, tuition: 14500 },
    ],
  };

  // Filter universities based on criteria
  const allUniversities = universitiesByCountry[selectedCountry] || [];
  const filteredUniversities = allUniversities.filter(uni => {
    const userGpa = parseFloat(gpa) || 0;
    const userIelts = parseFloat(ielts) || 0;
    
    // If no filters applied, return all
    if (!isFiltering) return true;
    
    // Check if user meets requirements
    const meetsGpa = gpa === '' || userGpa >= uni.minGpa;
    const meetsIelts = ielts === '' || userIelts >= uni.minIelts;
    const meetsTuition = uni.tuition <= tuitionRange[1];
    
    return meetsGpa && meetsIelts && meetsTuition;
  });

  // Limit to 2 universities when filtering
  const universities = isFiltering ? filteredUniversities.slice(0, 2) : allUniversities;
  const hasMoreResults = isFiltering && filteredUniversities.length > 2;
  const [selectedUniversityType, setSelectedUniversityType] = useState('public');
  return (
    <div className="">
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee-container {
          display: flex;
        }
        .marquee-content {
          display: flex;
          animation: marquee 20s linear infinite;
        }
        .marquee-container:hover .marquee-content {
          animation-play-state: paused;
        }
        input[type='range']::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #E3572B;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(227, 87, 43, 0.3);
        }
        input[type='range']::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #E3572B;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(227, 87, 43, 0.3);
        }
      `}</style>
      
      {/* Hero Section - Full Width */}
      <div className="relative w-full">
        {/* Background Image */}
        <div className="relative h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px]">
          <Image
            src="/hero/internationl_banner.png"
            alt="National University Banner"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#0000000a]"></div>
          <div className="flex justify-end relative right-5 top-5">
            <p className='font-pacifico text-[22px] text-[rgba(227,87,43,1)] font-normal leading-[39px] tracking-[0%] text-center'>
              "Your dream university is just a click away no stress, no mess, just success!
              <br />Apply smart, not hard  we make admissions easy."
            </p>
          </div>
        
        </div>
        

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-end px-4 md:px-6 text-center bottom-10">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3 md:gap-4  justify-center">
            <button className="px-6 md:px-8 py-1  rounded-t-[35px] bg-[#e67609] text-white font-outfit font-semibold text-sm md:text-base hover:bg-[#e67609] transition-all">
              Public University
            </button>
            <button className="px-6  md:px-8 py-1 rounded-t-[35px] bg-white text-gray-700 font-outfit font-semibold text-sm md:text-base hover:bg-gray-100 transition-all">
              <span className='text-[#e3572b] text-sm'>For address</span><br />
              <span className='text-[#e3572b]'>Search for details</span>
            </button>
          </div>

          {/* Search/Filter Card */}
          <div className="bg-[#dcdcdc70] backdrop-blur-[70px] rounded-2xl md:rounded-3xl p-4 md:p-6 w-full max-w-6xl mx-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
              {/* Location */}
              <div className="flex flex-col text-left border-r border-[#121417] pr-4 md:pr-6">
                <h3 className="font-outfit font-bold text-gray-900 text-sm md:text-base lg:text-lg mb-1">Location</h3>
                <p className="text-gray-500 text-xs md:text-sm">Search destination</p>
              </div>

              {/* Application Date */}
              <div className="flex flex-col text-left border-r border-[#121417] pr-4 md:pr-6">
                <h3 className="font-outfit font-bold text-gray-900 text-sm md:text-base lg:text-lg mb-1">Application date</h3>
                <p className="text-gray-500 text-xs md:text-sm">Select date</p>
              </div>

              {/* Application Process */}
              <div className="flex flex-col text-left border-r border-[#121417] pr-4 md:pr-6">
                <h3 className="font-outfit font-bold text-gray-900 text-sm md:text-base lg:text-lg mb-1">Application Process</h3>
                <p className="text-gray-500 text-xs md:text-sm">View process</p>
              </div>

              {/* Criteria */}
              <div className="flex flex-col text-left border-r border-[#121417] pr-4 md:pr-6">
                <h3 className="font-outfit font-bold text-gray-900 text-sm md:text-base lg:text-lg mb-1">Criteria</h3>
                <p className="text-gray-500 text-xs md:text-sm">See all info</p>
              </div>

              {/* Search Button */}
              <div className="flex flex-col text-left">
                <h3 className="font-outfit font-bold text-gray-900 text-sm md:text-base lg:text-lg mb-1">IELTS, GRE</h3>
                <p className="text-gray-500 text-xs md:text-sm">facilities Program</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services We Will Provide Section */}
      <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-12 md:py-20">
              {/* Section Title */}
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold font-rubik text-center mb-4 text-[#e3572b]">
                Services we will provide
              </h2>
              
              <p className="text-center text-[#1a202c] text-sm md:text-base mb-12 md:mb-16 mt-12 font-jakarta font-normal">
                What We Offer to Simplify Your University Application Journey
              </p>
      
              {/* Three Service Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {/* Card 1 - One-Click Multi-University Application */}
                <div className="bg-[#fff4ea] rounded-[10px] p-6 md:p-8 text-center hover:shadow-lg transition-shadow border border-[#e3572b]">
                  
                  <h3 className="font-rubik font-bold text-lg md:text-xl lg:text-2xl mb-4 text-gray-900">
                    One-Click Multi-University<br />Application
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    Apply to multiple national universities through a single, streamlined submission process.
                  </p>
                  <div className="mt-3">
                    <div className="w-[117px] h-16 md:w-[117px] md:h-20 mx-auto rounded-2xl flex items-center justify-center">
                      <Image 
                        src="/icons/application-icon.png" 
                        width={117} 
                        height={62} 
                        alt="Application icon"
                        
                        
                      />
                    </div>
                  </div>
                </div>
      
                {/* Card 2 - Smart Document Management */}
                <div className="bg-[#fff4ea] rounded-[10px] p-6 md:p-8 text-center hover:shadow-lg transition-shadow border border-[#e3572b]">
                  
                  <h3 className="font-rubik font-bold text-lg md:text-xl lg:text-2xl mb-4 text-gray-900">
                    Smart Document<br />Management
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    Easily upload, manage, and reuse your academic documents for all applications in one secure place.
                  </p>
                  <div className="mt-3">
                    <div className=" mx-auto bg-[#FFF4EA] rounded-2xl flex items-center justify-center">
                      <Image 
                        src="/icons/document-icon.png" 
                        width={85} 
                        height={65} 
                        alt="Document icon"
                      />
                    </div>
                  </div>
                </div>
      
                {/* Card 3 - Real-Time Application Tracking */}
                <div className="bg-[#FFF4EA] rounded-[10px] p-6 md:p-8 text-center hover:shadow-lg transition-shadow border border-[#e3572b]">
                  
                  <h3 className="font-rubik font-bold text-lg md:text-xl lg:text-2xl mb-4 text-gray-900">
                    Real-Time Application<br />Tracking
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    Track the status of your applications, get deadline reminders, and stay informed every step of the way.
                  </p>
                  <div className="mt-3">
                    <div className=" mx-auto  rounded-2xl flex items-center justify-center">
                      <Image 
                        src="/icons/tracking-icon.png" 
                        width={87} 
                        height={72} 
                        alt="Tracking icon"
                        
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

      {/* Partners in Success Section */}
      <div className="bg-[#FFF4EA] py-12 md:py-16">
              <div className="max-w-[1320px] mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 md:mb-12">
                  <div>
                    <h2 className="font-poppins font-semibold text-3xl md:text-4xl lg:text-6xl  mb-2">
                      Partners in Success
                    </h2>
                    <p className="text-black font-outfit font-normal text-sm md:text-base">
                      Trusted by over top 50+ consultant & Institute 
                    </p>
                  </div>
                  <button className="mt-4 sm:mt-0 px-6 py-2.5 rounded-full bg-[#E3572B] text-white font-outfit font-semibold text-sm md:text-base hover:bg-orange-800 transition-all">
                     View All
                  </button>
                </div>
      
                {/* Partner Icons */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
                  <div className="">
                    <Image
                      src="/partners/company1.png"
                      width={160}
                      height={160}
                      alt=''
                      />
                  </div>
      
                  <div className="">
                    <Image
                      src="/partners/company2.png"
                      width={160}
                      height={160}
                      alt=''
                      />
                  </div>
      
                  <div className="">
                    <Image
                      src="/partners/company3.png"
                      width={160}
                      height={160}
                      alt=''
                      />
                  </div>
      
                  <div className="">
                    <Image
                      src="/partners/company4.png"
                      width={160}
                      height={160}
                      alt=''
                      />
                  </div>
      
                  <div className="">
                    <Image
                      src="/partners/company5.png"
                      width={160}
                      height={160}
                      alt=''
                      />
                  </div>
                </div>
              </div>
            </div>

      {/* University We Are Working With Section */}
      <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-12 md:py-20">
              {/* Section Title */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl  text-center mb-3 font-outfit font-bold">
          <span className="text-[#E3572B]">University</span> we are working with
        </h2>
              
              <p className="text-center text-gray-600 text-sm md:text-base mb-8 md:mb-12">
                Trusted by Top National Universities to Simplify Admissions and Empower<br className="hidden sm:block" /> Student Application Experience.
              </p>
      
              {/* Country Filter Buttons with Marquee */}
        <div className="relative overflow-hidden mb-12 px-4">
          <div className="marquee-container">
            <div className="marquee-content">
              {/* First set of countries */}
              {countries.map((country, index) => (
                <button
                  key={`${country.name}-1-${index}`}
                  onClick={() => setSelectedCountry(country.name)}
                  className={`flex justify-center items-center gap-2 px-4 md:px-6 py-2 rounded-full font-outfit font-semibold text-sm md:text-base transition-all border mx-2 flex-shrink-0 ${selectedCountry === country.name
                      ? 'bg-[#d95d39] text-white border-[#d95d39]'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-[#d95d39]'
                    }`}
                >
                  <span className={`fi fi-${country.code} text-xl fis rounded-full`}></span>
                  {country.name}
                </button>
              ))}
              {/* Duplicate set for seamless loop */}
              {countries.map((country, index) => (
                <button
                  key={`${country.name}-2-${index}`}
                  onClick={() => setSelectedCountry(country.name)}
                  className={`flex justify-center items-center gap-2 px-4 md:px-6 py-2 rounded-full font-outfit font-semibold text-sm md:text-base transition-all border mx-2 flex-shrink-0 ${selectedCountry === country.name
                      ? 'bg-[#d95d39] text-white border-[#d95d39]'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-[#d95d39]'
                    }`}
                >
                  <span className={`fi fi-${country.code} text-xl fis rounded-full`}></span>
                  {country.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      
              {/* Refine Your Search Filter Section */}
              <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 mb-12 border border-gray-100 max-w-[1320px] mx-auto">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 font-outfit">
                  Refine Your Search
                </h3>
                
                {/* GPA and IELTS Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* GPA Input */}
                  <div>
                    <label className="block text-gray-900 font-semibold mb-3 font-outfit text-sm md:text-base">
                      Your GPA (0.0 - 4.0)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g., 3.5"
                      value={gpa}
                      onChange={(e) => setGpa(e.target.value)}
                      min="0"
                      max="4"
                      step="0.1"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-outfit focus:outline-none focus:border-[#E3572B] transition-colors text-gray-700 placeholder:text-gray-400"
                    />
                  </div>

                  {/* IELTS Input */}
                  <div>
                    <label className="block text-gray-900 font-semibold mb-3 font-outfit text-sm md:text-base">
                      Your IELTS Score (0.0 - 9.0)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g., 7.0"
                      value={ielts}
                      onChange={(e) => setIelts(e.target.value)}
                      min="0"
                      max="9"
                      step="0.5"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-outfit focus:outline-none focus:border-[#E3572B] transition-colors text-gray-700 placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Tuition Fee Range */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-gray-900 font-semibold font-outfit text-sm md:text-base">
                      Tuition Fee Range
                    </label>
                    <span className="text-[#E3572B] font-bold font-outfit text-sm md:text-base">
                      ${tuitionRange[0].toLocaleString()} - ${tuitionRange[1].toLocaleString()}
                    </span>
                  </div>
                  
                  {/* Range Slider */}
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="60000"
                      step="1000"
                      value={tuitionRange[1]}
                      onChange={(e) => setTuitionRange([tuitionRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-gradient-to-r from-[#E3572B] to-[#FF8B22] rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #E3572B 0%, #FF8B22 ${(tuitionRange[1] / 60000) * 100}%, #e5e7eb ${(tuitionRange[1] / 60000) * 100}%, #e5e7eb 100%)`
                      }}
                    />
                  </div>
                </div>
              </div>
      
              {/* University Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {universities.map((university, index) => (
                  <div key={index} className="bg-[#fff4ea] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow p-5">
                    <div className="relative h-48">
                      <Image
                        src={university.image}
                        alt={university.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1">{university.name}</h3>
                      <p className="text-[#F88210] text-sm font-semibold mb-1">{university.type}</p>
                      <p className="text-gray-500 text-sm mb-4">{university.location}</p>
                      <button className="w-full px-4 py-2.5 rounded-lg bg-[#E3572B] text-white font-outfit font-semibold text-sm">
                        Application Form open
                      </button>
                    </div>
                  </div>
                ))}
              </div>
      
              {/* Buttons - Show "See More" when filtering, otherwise show "Start Application" */}
              <div className="flex justify-center">
                {hasMoreResults ? (
                  <button 
                    onClick={() => router.push('/sign-in')}
                    className="px-8 py-3.5 rounded-xl bg-[#E3572B] text-white font-outfit font-bold text-base md:text-lg hover:bg-[#e67609] transition-all flex items-center gap-3 shadow-lg"
                  >
                    See More Results ({filteredUniversities.length - 2} more)
                  </button>
                ) : (
                  <button className="px-8 py-3.5 rounded-xl bg-[#E3572B] text-white font-outfit font-bold text-base md:text-lg hover:bg-[#e67609] transition-all flex items-center gap-3 shadow-lg border border-black">
                    Start Application now
                  </button>
                )}
              </div>
            </div>

      {/* Applying Process Section */}
            <div className=" py-12 md:py-16">
                    <div className="max-w-[1320px] mx-auto px-4 md:px-6">
                      {/* Section Title */}
                      <h2 className="text-3xl md:text-4xl lg:text-5xl  text-center mb-3 text-[#E3572B] font-jakarta font-medium">
                        Applying Process
                      </h2>
                      <p className="text-center text-gray-600 text-sm md:text-base mb-12 md:mb-16">
                        University Application Sign-Up Form: Contact National University Database With All<br className="hidden sm:block" /> the Information Anyone Can Search Specific.
                      </p>
            
                      {/* Process Steps */}
                      <div className="relative">
                        {/* Steps with Icons and Descriptions */}
                        <div className="flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-0">
                          {/* Step 1 */}
                          <div className="flex-1 flex flex-col items-center text-center max-w-xs">
                            <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mb-6">
                              <Image
                                src="/icons/location.png"
                                width={78}
                                height={78}
                                alt="Location Icon"
                              />
                            </div>
                            <h3 className="font-semibold text-lg md:text-xl mb-2 text-[#E3572B] font-jakarta">Choose University</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              Apply to each university through a simple, streamlined application form.
                            </p>
                          </div>
            
                          {/* Connector 1 */}
                          <div className="hidden lg:flex items-start justify-center pt-8 flex-shrink-0">
                            <Image
                              src="/icons/connector.png"
                              width={180}
                              height={60}
                              alt="Connector"
                              className="object-contain"
                            />
                          </div>
            
                          {/* Step 2 */}
                          <div className="flex-1 flex flex-col items-center text-center max-w-xs">
                            <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mb-6">
                              <Image
                                src="/icons/doc.png"
                                width={78}
                                height={78}
                                alt="Document Icon"
                              />
                            </div>
                            <h3 className="font-semibold text-lg md:text-xl mb-2 text-[#E3572B] font-jakarta">Upload Documents</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              Upload your identification, High school transcripts, CV, and all other required documents for complete application.
                            </p>
                          </div>
            
                          {/* Connector 2 */}
                          <div className="hidden lg:flex items-start justify-center pt-8 flex-shrink-0">
                            <Image
                              src="/icons/connector.png"
                              width={180}
                              height={60}
                              alt="Connector"
                              className="object-contain"
                            />
                          </div>
            
                          {/* Step 3 */}
                          <div className="flex-1 flex flex-col items-center text-center max-w-xs">
                            <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mb-6">
                              <Image
                                src="/icons/payment.png"
                                width={78}
                                height={78}
                                alt="Payment Icon"
                              />
                            </div>
                            <h3 className="font-semibold text-lg md:text-xl mb-2 text-[#E3572B] font-jakarta">One-time payment</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              From admissions to visa dates, whether you're joining spring, winter, or fall term - track them all
                            </p>
                          </div>
            
                          {/* Connector 3 */}
                          <div className="hidden lg:flex items-start justify-center pt-8 flex-shrink-0">
                            <Image
                              src="/icons/connector.png"
                              width={180}
                              height={60}
                              alt="Connector"
                              className="object-contain"
                            />
                          </div>
            
                          {/* Step 4 */}
                          <div className="flex-1 flex flex-col items-center text-center max-w-xs">
                            <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mb-6">
                              <Image
                                src="/icons/car.png"
                                width={78}
                                height={78}
                                alt="Car Icon"
                              />
                            </div>
                            <h3 className="font-semibold text-lg md:text-xl mb-2 text-[#E3572B] font-jakarta">Start Applying</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              Your University is not far away. Get ready to fly to your dream University Life.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
      
            {/* News and Updates Section */}
            <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-12 md:py-20">
                          {/* Section Header */}
                          <div className="mb-12 font-normal font-poppins">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl  mb-2">News and Updates</h2>
                            <p className="text-gray-600 text-base md:text-lg">Stay up to date with us</p>
                          </div>
                  
                          {/* News Cards */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {/* News Card 1 */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                              <div className="relative h-[160px] overflow-hidden">
                                <Image
                                  src="/news/news1.png"
                                  alt="Aga Khan Foundation Scholarship"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="p-4">
                                <h3 className="font-bold text-base mb-2 line-clamp-2">
                                  Aga Khan Foundation International Scholarship Programme
                                </h3>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                                  These programmes offer funding and support opportunities for students interested in pursuing education...
                                </p>
                                <p className="text-gray-400 text-xs">14k views</p>
                              </div>
                            </div>
                  
                            {/* News Card 2 */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                              <div className="relative h-[160px] overflow-hidden">
                                <Image
                                  src="/news/news2.png"
                                  alt="World Bank Scholarship"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="p-4">
                                <h3 className="font-bold text-base mb-2 line-clamp-2">
                                  the World Bank Scholarship
                                </h3>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                                  Several universities in Australia offer full scholarships for Bangladeshi and other students to study in a...
                                </p>
                                <p className="text-gray-400 text-xs">14k views</p>
                              </div>
                            </div>
                  
                            {/* News Card 3 */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                              <div className="relative h-[160px] overflow-hidden">
                                <Image
                                  src="/news/news3.png"
                                  alt="Mastercard Foundation Scholarship"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="p-4">
                                <h3 className="font-bold text-base mb-2 line-clamp-2">
                                  the Mastercard Foundation Scholarship
                                </h3>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                                  Many programs exist, funding and support varies by institution and criteria set by institution...
                                </p>
                                <p className="text-gray-400 text-xs">14k views</p>
                              </div>
                            </div>
                  
                            {/* News Card 4 */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                              <div className="relative h-[160px] overflow-hidden">
                                <Image
                                  src="/news/news4.png"
                                  alt="Ulster University Scholarships"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="p-4">
                                <h3 className="font-bold text-base mb-2 line-clamp-2">
                                  Ulster University Scholarships
                                </h3>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                                  It can provide some details about Ulster University's programs and scholarship opportunities...
                                </p>
                                <p className="text-gray-400 text-xs">14k views</p>
                              </div>
                            </div>
                          </div>
                  
                          {/* Explore More Button */}
                          <div className="text-center">
                            <Link href="/news-updates">
                              <button className="font-outfit font-semibold text-white text-2xl py-5 px-8 bg-[#E3572B] rounded-[40px] hover:bg-[#c24d2b] transition-all">
                                Explore More News
                              </button>
                            </Link>
                          </div>
                        </div>
      
            {/* Need Help Section */}
                  <div className=" py-12 md:py-16 mb-25">
                    <div className="max-w-[1320px] mx-auto px-4 md:px-6">
                      {/* Section Title */}
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-3 font-jakarta text-[#E3572B]">
                        Need help with application?
                      </h2>
                      <p className="text-center text-gray-600 text-sm md:text-base mb-12 mt-12 md:mb-16">
                        Let the right one in. This platform supports students with what they want, and<br className="hidden sm:block" /> we are here for ease of admission for students.
                      </p>
            
                      {/* Help Cards Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {/* Card 1 - Customer Support */}
                        <div className="bg-[#FFF4EA] rounded-3xl p-6 md:p-8 text-center hover:shadow-xl transition-shadow">
                          <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 bg-[#FFF4EA] rounded-full flex items-center justify-center">
                            <Image
                              src="/icons/support.png"
                              width={51}
                              height={51}
                              alt="Support Icon"
                            />
                          </div>
                          <h3 className=" text-xl md:text-2xl mb-3 text-[#1a202c] font-jakarta font-semibold">Customer Support</h3>
                          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                            Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices.
                          </p>
                          
                        </div>
            
                        {/* Card 2 - One-on-One Consultation */}
                        <div className="bg-[#FFF4EA] rounded-3xl p-6 md:p-8 text-center hover:shadow-xl transition-shadow">
                          <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 bg-[#FFF4EA] rounded-full flex items-center justify-center">
                            <Image
                              src="/icons/onetime.png"
                              width={51}
                              height={51}
                              alt="Support Icon"
                            />
                          </div>
                          <h3 className=" text-xl md:text-2xl mb-3 text-[#1a202c] font-jakarta font-semibold">One time Payment process</h3>
                          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                            Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices.
                          </p>
                          
                        </div>
            
                        {/* Card 3 - Campus Visit */}
                        <div className="bg-[#FFF4EA] rounded-3xl p-6 md:p-8 text-center hover:shadow-xl transition-shadow">
                          <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 bg-[#FFF4EA] rounded-full flex items-center justify-center">
                            <Image
                              src="/icons/consult.png"
                              width={51}
                              height={51}
                              alt="Support Icon"
                            />
                          </div>
                          <h3 className=" text-xl md:text-2xl mb-3 text-[#1a202c] font-jakarta font-semibold">Consult with us in our office</h3>
                          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                            Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices.
                          </p>
                          
                        </div>
                      </div>
                    </div>
                  </div>
    </div>
  );
};

export default page;