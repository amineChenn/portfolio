import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Server, Database, Cloud } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import SectionTransition from '../ui/SectionTransition';
import { skills } from '../../data/portfolio';
import { useLanguage } from '../../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

// Tech logo SVG components with colors
const TechLogos = {
  angular: () => (
    <svg viewBox="0 0 128 128" className="w-full h-full">
      <path fill="#dd0031" d="M64 0L12 20.4l7.9 68.2L64 128l44.1-39.4 7.9-68.2L64 0z"/>
      <path fill="#c3002f" d="M64 0v14.2-.1V128l44.1-39.4 7.9-68.2L64 0z"/>
      <path fill="#fff" d="M64 24.5L30.1 102h12.7l6.8-17h28.8l6.8 17h12.7L64 24.5zm9.6 51H54.4L64 50.8l9.6 24.7z"/>
    </svg>
  ),
  react: () => (
    <svg viewBox="0 0 128 128" className="w-full h-full">
      <circle cx="64" cy="64" r="11.4" fill="#61dafb"/>
      <path fill="none" stroke="#61dafb" strokeWidth="4" d="M64 32c-35.3 0-64 14.3-64 32s28.7 32 64 32 64-14.3 64-32-28.7-32-64-32z"/>
      <path fill="none" stroke="#61dafb" strokeWidth="4" d="M32 64c0 35.3 14.3 64 32 64s32-28.7 32-64-14.3-64-32-64-32 28.7-32 64z" transform="rotate(60 64 64)"/>
      <path fill="none" stroke="#61dafb" strokeWidth="4" d="M32 64c0-35.3 14.3-64 32-64s32 28.7 32 64-14.3 64-32 64-32-28.7-32-64z" transform="rotate(-60 64 64)"/>
    </svg>
  ),
  typescript: () => (
    <svg viewBox="0 0 128 128" className="w-full h-full">
      <rect fill="#3178c6" width="128" height="128" rx="10"/>
      <path fill="#fff" d="M82 95v11c2 1 5 2 8 2s5-1 8-2v-9c-2 1-4 1-6 1-3 0-5-1-6-2-1-2-2-4-2-7V58h14V47H84V30H71v17H60v11h11v35c0 5 1 9 4 12 3 4 7 5 12 5"/>
      <path fill="#fff" d="M28 47h45v11H58v47H44V58H28V47z"/>
    </svg>
  ),
  javascript: () => (
    <svg viewBox="0 0 128 128" className="w-full h-full">
      <rect fill="#f7df1e" width="128" height="128"/>
      <path fill="#000" d="M80.8 101.2c2.4 3.9 5.5 6.8 11 6.8 4.6 0 7.6-2.3 7.6-5.5 0-3.8-3-5.2-8.2-7.4l-2.8-1.2c-8.1-3.5-13.5-7.8-13.5-17 0-8.5 6.5-14.9 16.6-14.9 7.2 0 12.4 2.5 16.1 9.1l-8.8 5.7c-1.9-3.5-4-4.9-7.3-4.9-3.3 0-5.4 2.1-5.4 4.9 0 3.4 2.1 4.8 7 6.8l2.8 1.2c9.6 4.1 15 8.3 15 17.7 0 10.1-8 15.7-18.6 15.7-10.4 0-17.2-5-20.5-11.5l9-5.3zM40.8 102.5c1.8 3.2 3.4 5.9 7.4 5.9 3.8 0 6.2-1.5 6.2-7.2V62.2h11.4v39.3c0 11.8-6.9 17.2-17 17.2-9.1 0-14.4-4.7-17.1-10.4l9.1-5.8z"/>
    </svg>
  ),
  html5: () => (
    <svg viewBox="0 0 128 128" className="w-full h-full">
      <path fill="#e44d26" d="M19.9 113.3L9.5 0h109l-10.4 113.3L64 128"/>
      <path fill="#f16529" d="M64 119.1l36.5-10.1 8.9-99.2H64"/>
      <path fill="#ebebeb" d="M64 51.6H45l-1.3-14.7h20.3V22.6H29.4l.3 3.7 3.4 38h30.9zM64 87.7l-.1.1-16.3-4.4-1-11.5H32.4l2 22.4 29.5 8.2.1-.1"/>
      <path fill="#fff" d="M64 51.6v14.3H82L80 82.6l-16 4.3v14.8l29.5-8.2.2-2.5 3.4-37.9.3-3.5H64zM64 22.6v14.3h32.5l.3-3.2 .6-6.8.3-4.3"/>
    </svg>
  ),
  tailwind: () => (
    <svg viewBox="0 0 128 128" className="w-full h-full">
      <path fill="#38bdf8" d="M64 29.5c-17.1 0-27.8 8.5-32 25.6 6.4-8.5 13.9-11.7 22.4-9.6 4.9 1.2 8.4 4.8 12.3 8.8C73.3 61 81 69 97 69c17.1 0 27.8-8.5 32-25.6-6.4 8.5-13.9 11.7-22.4 9.6-4.9-1.2-8.4-4.8-12.3-8.8C87.7 37.5 80 29.5 64 29.5zM32 69C14.9 69 4.2 77.5 0 94.6c6.4-8.5 13.9-11.7 22.4-9.6 4.9 1.2 8.4 4.8 12.3 8.8 6.6 6.7 14.3 14.7 30.3 14.7 17.1 0 27.8-8.5 32-25.6-6.4 8.5-13.9 11.7-22.4 9.6-4.9-1.2-8.4-4.8-12.3-8.8C55.7 77 48 69 32 69z"/>
    </svg>
  ),
  rxjs: () => (
    <svg viewBox="0 0 128 128" className="w-full h-full">
      <path fill="#d81b60" d="M64 8C32.7 8 8 32.7 8 64s24.7 56 56 56 56-24.7 56-56S95.3 8 64 8zm24.8 76.4c-2.6 4.4-7.3 7.1-12.4 7.1H52.1c-5.2 0-9.9-2.7-12.4-7.1L27.2 63.6c-2.6-4.4-2.6-9.8 0-14.2l12.5-20.8c2.6-4.4 7.3-7.1 12.4-7.1h24.3c5.2 0 9.9 2.7 12.4 7.1l12.5 20.8c2.6 4.4 2.6 9.8 0 14.2L88.8 84.4z"/>
    </svg>
  ),
  java: () => (
    <svg viewBox="0 0 128 128" className="w-full h-full">
      <path fill="#0074bd" d="M47.6 95.9s-3.8 2.2 2.7 2.9c7.9 0.9 11.9 0.8 20.6-0.9 0 0 2.3 1.4 5.5 2.7-19.4 8.3-44-0.5-28.8-4.7z"/>
      <path fill="#0074bd" d="M44.3 82.2s-4.2 3.1 2.2 3.8c8.3 0.8 15 0.9 26.5-1.2 0 0 1.6 1.6 4.1 2.5-23.5 6.9-49.7 0.5-32.8-5.1z"/>
      <path fill="#ea2d2e" d="M68 62c4.8 5.6-1.3 10.6-1.3 10.6s12.3-6.4 6.7-14.3c-5.3-7.4-9.3-11.1 12.6-23.7 0 0-34.4 8.6-18 27.4z"/>
      <path fill="#0074bd" d="M99.3 104.6s2.8 2.3-3.1 4.1c-11.2 3.4-46.6 4.4-56.4 0.1-3.5-1.5 3.1-3.7 5.2-4.1 2.2-0.5 3.4-0.4 3.4-0.4-3.9-2.8-25.3 5.4-10.9 7.8 39.4 6.4 71.8-2.9 61.8-7.5z"/>
      <path fill="#0074bd" d="M49.7 68.2s-17.9 4.3-6.4 5.8c4.9 0.6 14.7 0.5 23.8-0.3 7.5-0.6 15-2 15-2s-2.6 1.1-4.5 2.4c-18.3 4.8-53.6 2.6-43.4-2.4 8.6-4.2 15.5-3.5 15.5-3.5z"/>
      <path fill="#0074bd" d="M90.8 87c18.6-9.7 10-19 4-17.7-1.5 0.3-2.1 0.6-2.1 0.6s0.6-0.9 1.6-1.3c12-4.2 21.2 12.4-3.8 19 0 0 0.3-0.3 0.3-0.6z"/>
      <path fill="#ea2d2e" d="M74.4 2s10.3 10.3-9.7 26.1c-16.1 12.7-3.7 19.9 0 28.2-9.4-8.5-16.3-16-11.7-22.9 6.8-10.2 25.6-15.2 21.4-31.4z"/>
      <path fill="#0074bd" d="M51.3 117.8c17.9 1.1 45.3-0.6 46-8.9 0 0-1.3 3.2-14.8 5.8-15.3 2.9-34.1 2.6-45.3 0.7 0 0 2.3 1.9 14.1 2.4z"/>
    </svg>
  ),
  spring: () => (
    <svg viewBox="0 0 128 128" className="w-full h-full">
      <path fill="#6db33f" d="M116.5 32.2c-3-4.9-7.6-8.4-12.8-10.5-5.2-2.1-11-2.8-16.8-2.2-5.8.6-11.4 2.6-16.2 5.8-4.8 3.2-8.8 7.6-11.5 12.7-2.7 5.1-4.1 10.9-4 16.7.1 5.8 1.6 11.5 4.5 16.5 2.9 5 7 9.2 12 12.2 5 3 10.7 4.7 16.5 4.9 5.8.2 11.6-1 16.8-3.5 5.2-2.5 9.6-6.3 12.9-10.9 3.3-4.6 5.3-10 5.9-15.6.6-5.6-.1-11.3-2-16.5-1.9-5.2-5-9.8-9.3-13.6zM64 112c-26.5 0-48-21.5-48-48S37.5 16 64 16s48 21.5 48 48-21.5 48-48 48z"/>
      <path fill="#6db33f" d="M102.1 38.9c-1.5-2.5-3.8-4.2-6.4-5.2-2.6-1.1-5.5-1.4-8.4-1.1-2.9.3-5.7 1.3-8.1 2.9-2.4 1.6-4.4 3.8-5.8 6.4-1.4 2.6-2.1 5.4-2 8.4.1 2.9.8 5.8 2.2 8.2 1.5 2.5 3.5 4.6 6 6.1 2.5 1.5 5.4 2.4 8.3 2.5 2.9.1 5.8-.5 8.4-1.8 2.6-1.2 4.8-3.1 6.5-5.5 1.7-2.3 2.7-5 3-7.8.3-2.8-.1-5.6-1-8.2-.9-2.6-2.5-4.9-4.7-6.9z"/>
    </svg>
  ),
  nodejs: () => (
    <svg viewBox="0 0 128 128" className="w-full h-full">
      <path fill="#83cd29" d="M112.8 80.6l-24.5 14.2c-1.3.8-3 .8-4.3 0l-9.5-5.5v-10.9l9.5 5.5c1.3.8 3 .8 4.3 0l24.5-14.2V54.1L88.3 39.9c-1.3-.8-3-.8-4.3 0L59.5 54.1v28.2L35 97.1c-1.3.8-3 .8-4.3 0l-9.5-5.5V62.1l9.5 5.5c1.3.8 3 .8 4.3 0L59.5 53V24.8L35 10c-1.3-.8-3-.8-4.3 0L6.2 24.2C4.9 25 4 26.4 4 28v56.3c0 1.6.9 3.1 2.2 3.8l24.5 14.2c1.3.8 3 .8 4.3 0l24.5-14.2 24.5 14.2c1.3.8 3 .8 4.3 0l24.5-14.2c1.3-.8 2.2-2.2 2.2-3.8V28c0-1.6-.9-3.1-2.2-3.8L88.3 10c-1.3-.8-3-.8-4.3 0L59.5 24.2V53l24.5-14.2c1.3-.8 3-.8 4.3 0l24.5 14.2v15.6z"/>
    </svg>
  ),
  postgresql: () => (
    <svg viewBox="0 0 128 128" className="w-full h-full">
      <path fill="#336791" d="M93.8 15.5C87.4 11.4 79.8 8 71.2 6.4c-8.6-1.6-17.3-1-25.6 1.3-8.3 2.3-15.8 6.4-22.1 11.9-6.3 5.5-11.3 12.4-14.6 20-3.3 7.6-4.8 16-4.3 24.3.5 8.3 2.9 16.4 7 23.7 4.1 7.3 9.8 13.6 16.7 18.5 6.9 4.9 14.8 8.4 23.2 10.1 8.4 1.7 17.1 1.6 25.4-.4 8.3-2 16-5.8 22.5-11 6.5-5.2 11.7-11.8 15.2-19.3 3.5-7.5 5.3-15.8 5.2-24.1-.1-8.3-2.1-16.5-5.8-24-3.7-7.5-9-14-15.4-19.2z"/>
      <path fill="#fff" d="M64 24c-22.1 0-40 17.9-40 40s17.9 40 40 40 40-17.9 40-40-17.9-40-40-40z"/>
      <path fill="#336791" d="M78 48c0 7.7-6.3 14-14 14s-14-6.3-14-14 6.3-14 14-14 14 6.3 14 14z"/>
    </svg>
  ),
  oracle: () => (
    <svg viewBox="0 0 128 128" className="w-full h-full">
      <path fill="#f80000" d="M32 44c-11 0-20 9-20 20s9 20 20 20h64c11 0 20-9 20-20s-9-20-20-20H32zm64 32H32c-6.6 0-12-5.4-12-12s5.4-12 12-12h64c6.6 0 12 5.4 12 12s-5.4 12-12 12z"/>
    </svg>
  ),
  mongodb: () => (
    <svg viewBox="0 0 128 128" className="w-full h-full">
      <path fill="#439934" d="M64 8.7l-2.5 4.6-8.6 16.3-4.3 8.1-2.1 4-4.3 8.1-8.5 16.3-2.1 4-4.3 8.1-8.6 16.3-2.1 4L15 103v4.3l1.3 2.6 1.7 3.4 2.1 4.3L22.3 122l2.6 2.1 3.4 1.3 4.3.4 4.3-.4 3.4-1.3 2.6-2.1 2.1-4.3 1.7-3.4 1.3-2.6V107l-1.7-4.3-2.1-4-4.3-8.1-2.1-4-4.3-8.1-8.6-16.3-2.1-4 4.3-8.1 8.6-16.3 4.3-8.1 2.1-4 4.3-8.1 8.6-16.3L64 8.7z"/>
      <path fill="#45a538" d="M64 8.7l2.5 4.6 8.6 16.3 4.3 8.1 2.1 4 4.3 8.1 8.5 16.3 2.1 4 4.3 8.1 8.6 16.3 2.1 4L113 103v4.3l-1.3 2.6-1.7 3.4-2.1 4.3-2.2 4.4-2.6 2.1-3.4 1.3-4.3.4-4.3-.4-3.4-1.3-2.6-2.1-2.1-4.3-1.7-3.4-1.3-2.6V107l1.7-4.3 2.1-4 4.3-8.1 2.1-4 4.3-8.1 8.6-16.3 2.1-4-4.3-8.1-8.6-16.3-4.3-8.1-2.1-4-4.3-8.1-8.6-16.3L64 8.7z"/>
    </svg>
  ),
  redis: () => (
    <svg viewBox="0 0 128 128" className="w-full h-full">
      <path fill="#a41e11" d="M121.8 93.1c-6.7 3.5-41.4 17.7-48.8 21.6-7.4 3.9-11.5 3.9-17.3 1.2-5.8-2.7-43.1-17.8-49.7-21.1C2.6 92.9 0 91.6 0 90.4v-16h0c0 1.2 2.6 2.5 6 4.3 6.6 3.3 43.9 18.5 49.7 21.2 5.8 2.7 9.9 2.6 17.3-1.3 7.4-3.9 42.1-18.1 48.8-21.6 3.3-1.7 5.9-2.9 6.2-3.5v16c-.1 1.2-2.9 2.9-6.2 4.6z"/>
      <path fill="#d82c20" d="M121.8 80c-6.7 3.5-41.4 17.7-48.8 21.6-7.4 3.9-11.5 3.9-17.3 1.2-5.8-2.7-43.1-17.8-49.7-21.1C2.6 79.8 0 78.5 0 77.3v-16h0c0 1.2 2.6 2.5 6 4.3 6.6 3.3 43.9 18.5 49.7 21.2 5.8 2.7 9.9 2.6 17.3-1.3 7.4-3.9 42.1-18.1 48.8-21.6 3.3-1.7 5.9-2.9 6.2-3.5v16c-.1 1.3-2.9 3-6.2 4.6z"/>
      <path fill="#a41e11" d="M121.8 67c-6.7 3.5-41.4 17.7-48.8 21.6-7.4 3.9-11.5 3.9-17.3 1.2-5.8-2.7-43.1-17.8-49.7-21.1C2.6 66.7 0 65.4 0 64.2v-16h0c0 1.2 2.6 2.5 6 4.3 6.6 3.3 43.9 18.5 49.7 21.2 5.8 2.7 9.9 2.6 17.3-1.3 7.4-3.9 42.1-18.1 48.8-21.6 3.3-1.7 5.9-2.9 6.2-3.5v16c-.1 1.3-2.9 3-6.2 4.7z"/>
      <path fill="#d82c20" d="M121.8 53.9c-6.7 3.5-41.4 17.7-48.8 21.6-7.4 3.9-11.5 3.9-17.3 1.2-5.8-2.7-43.1-17.8-49.7-21.1-3.4-1.8-6-3.1-6-4.3v-16h0c0 1.2 2.6 2.5 6 4.3 6.6 3.3 43.9 18.5 49.7 21.2 5.8 2.7 9.9 2.6 17.3-1.3 7.4-3.9 42.1-18.1 48.8-21.6 3.3-1.7 5.9-2.9 6.2-3.5v16c-.1 1.2-2.9 2.9-6.2 4.5z"/>
    </svg>
  ),
  docker: () => (
    <svg viewBox="0 0 128 128" className="w-full h-full">
      <path fill="#019bc6" d="M124.8 52.1c-4.3-2.5-10-2.8-14.8-1.4-.6-5.2-4-9.7-8-12.9l-1.6-1.3-1.4 1.6c-2.7 3.1-3.5 8.3-3.1 12.3.3 2.9 1.2 5.9 3 8.3-1.4.8-2.9 1.9-4.3 2.4-2.8 1-5.9 2-8.9 2H79V61H66V48h-13v-13H40V22H27v13H14v13H1v13h25v1.2c.5 8.2 3.7 16.3 9.2 22.8.1.1.2.2.3.3l.1.1c0 .1.1.1.1.2 0 0 0 .1.1.1 5.5 6.2 13.2 10.2 22.2 12.1.1 0 .2 0 .3.1 3.6.8 7.3 1.2 11.1 1.2 10.6 0 20.5-2.9 29-7.5 6.7-3.6 12.6-8.4 17.3-14.1.5-.5.9-1 1.3-1.5l.2-.2c3.5-4.9 6.2-10.4 7.8-16.1 0-.1.1-.2.1-.3.2-.8.4-1.6.6-2.4h1.8c5.2 0 10.1-2 13.6-5.3l1.2-1.1-1.1-1.1-.1-.1c-.1-.1-.2-.2-.3-.3z"/>
      <path fill="#019bc6" d="M28 40h10v10H28zM41 40h10v10H41zM54 40h10v10H54zM28 53h10v10H28zM41 53h10v10H41zM54 53h10v10H54zM67 53h10v10H67zM54 27h10v10H54z"/>
    </svg>
  ),
  kubernetes: () => (
    <svg viewBox="0 0 128 128" className="w-full h-full">
      <path fill="#326ce5" d="M64 5.3c-1.4 0-2.6.7-3.4 1.8L11.4 70.9c-.8 1.1-1 2.5-.6 3.8l17.9 54.5c.5 1.4 1.6 2.5 3 2.9l54.5 14.6c1.4.4 2.8.1 4-.7l44.8-32.4c1.1-.8 1.9-2.1 2-3.5l3.5-56.6c.1-1.4-.5-2.8-1.5-3.8L93.8 9.5c-1.1-1-2.5-1.5-4-1.3L65.1 5.4c-.4-.1-.7-.1-1.1-.1z"/>
      <path fill="#fff" d="M64 25.4l-4.5 13.8-13.8 4.5 13.8 4.5L64 61.9l4.5-13.7 13.8-4.5-13.8-4.5-4.5-13.8zm0 8.6l2.1 6.3 6.3 2.1-6.3 2.1-2.1 6.3-2.1-6.3-6.3-2.1 6.3-2.1 2.1-6.3zm-18.3 21.6l-1.7 5.3-5.3 1.7 5.3 1.7 1.7 5.3 1.7-5.3 5.3-1.7-5.3-1.7-1.7-5.3zm36.6 0l-1.7 5.3-5.3 1.7 5.3 1.7 1.7 5.3 1.7-5.3 5.3-1.7-5.3-1.7-1.7-5.3zM64 74l-4.5 13.8-13.8 4.5 13.8 4.5 4.5 13.7 4.5-13.7 13.8-4.5-13.8-4.5L64 74z"/>
    </svg>
  ),
  git: () => (
    <svg viewBox="0 0 128 128" className="w-full h-full">
      <path fill="#f34f29" d="M124.7 58.4L69.6 3.3c-3.3-3.3-8.6-3.3-11.8 0l-11.4 11.4 14.5 14.5c3.4-1.1 7.2-.3 9.9 2.4 2.7 2.7 3.5 6.5 2.4 9.9l14 14c3.4-1.1 7.2-.3 9.9 2.4 3.7 3.7 3.7 9.7 0 13.4-3.7 3.7-9.7 3.7-13.4 0-2.9-2.9-3.6-7.2-2-10.8L68 46.6v35.8c.9.5 1.8 1.1 2.5 1.9 3.7 3.7 3.7 9.7 0 13.4s-9.7 3.7-13.4 0-3.7-9.7 0-13.4c.9-.9 2-1.6 3.1-2.1V46c-1.1-.5-2.2-1.2-3.1-2.1-2.9-2.9-3.6-7.1-2.1-10.6L40.6 18.9 3.3 56.2c-3.3 3.3-3.3 8.6 0 11.8l55.1 55.1c3.3 3.3 8.6 3.3 11.8 0l54.5-54.5c3.3-3.3 3.3-8.6 0-11.8v-.4z"/>
    </svg>
  ),
  gitlab: () => (
    <svg viewBox="0 0 128 128" className="w-full h-full">
      <path fill="#e24329" d="M64 119.2L43.6 57h40.8L64 119.2z"/>
      <path fill="#fc6d26" d="M64 119.2L43.6 57H7.4l56.6 62.2z"/>
      <path fill="#fca326" d="M7.4 57L2 73.8c-.5 1.5 0 3.2 1.2 4.1L64 119.2 7.4 57z"/>
      <path fill="#e24329" d="M7.4 57h36.2L28.6 10.5c-.5-1.6-2.8-1.6-3.4 0L7.4 57z"/>
      <path fill="#fc6d26" d="M64 119.2l20.4-62.2h36.2L64 119.2z"/>
      <path fill="#fca326" d="M120.6 57l5.4 16.8c.5 1.5 0 3.2-1.2 4.1L64 119.2l56.6-62.2z"/>
      <path fill="#e24329" d="M120.6 57H84.4l15 46.5c.5 1.6 2.8 1.6 3.4 0L120.6 57z"/>
    </svg>
  ),
  jenkins: () => (
    <svg viewBox="0 0 128 128" className="w-full h-full">
      <path fill="#d33833" d="M64 8C32.7 8 8 32.7 8 64s24.7 56 56 56 56-24.7 56-56S95.3 8 64 8z"/>
      <ellipse fill="#f0d6b7" cx="64" cy="68" rx="36" ry="40"/>
      <path fill="#d33833" d="M64 32c-15.5 0-28 9-28 20s12.5 20 28 20 28-9 28-20-12.5-20-28-20z"/>
      <circle fill="#fff" cx="52" cy="56" r="8"/>
      <circle fill="#000" cx="52" cy="56" r="4"/>
      <circle fill="#fff" cx="76" cy="56" r="8"/>
      <circle fill="#000" cx="76" cy="56" r="4"/>
      <path fill="#d33833" d="M64 72c-8 0-12 4-12 4s4 8 12 8 12-8 12-8-4-4-12-4z"/>
    </svg>
  ),
  sonarqube: () => (
    <svg viewBox="0 0 128 128" className="w-full h-full">
      <path fill="#549dd0" d="M104 104H24c-8.8 0-16-7.2-16-16V40c0-8.8 7.2-16 16-16h80c8.8 0 16 7.2 16 16v48c0 8.8-7.2 16-16 16z"/>
      <path fill="#fff" d="M88 80H40c-2.2 0-4-1.8-4-4V52c0-2.2 1.8-4 4-4h48c2.2 0 4 1.8 4 4v24c0 2.2-1.8 4-4 4zM48 72h32V56H48v16z"/>
    </svg>
  ),
  api: () => (
    <svg viewBox="0 0 128 128" className="w-full h-full">
      <rect fill="#2563eb" width="128" height="128" rx="20"/>
      <path fill="#fff" d="M40 90h-8L50 38h8l18 52h-8l-4-14H44l-4 14zm6-20h14l-7-24-7 24zM80 38h20c10 0 16 6 16 14s-4 13-10 15l12 23h-9l-11-22h-10v22h-8V38zm8 24h11c6 0 9-3 9-8s-3-8-9-8H88v16z"/>
    </svg>
  ),
  microservices: () => (
    <svg viewBox="0 0 128 128" className="w-full h-full">
      <circle fill="#3b82f6" cx="64" cy="64" r="56"/>
      <circle fill="#fff" cx="64" cy="40" r="12"/>
      <circle fill="#fff" cx="40" cy="80" r="12"/>
      <circle fill="#fff" cx="88" cy="80" r="12"/>
      <path fill="#fff" stroke="#3b82f6" strokeWidth="2" d="M64 52v16M52 74L64 68M76 74L64 68"/>
    </svg>
  ),
};

// Skill card with animated logo and GSAP scroll animations
const SkillCard = ({ skill, index, isInView, categoryKey }) => {
  const LogoComponent = TechLogos[skill.icon] || TechLogos.api;
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || !isInView) return;

    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(card, {
        opacity: 0,
        y: 50,
        scale: 0.8,
        rotateX: 20,
      });

      // Animate in with stagger based on index
      gsap.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 0.7,
        delay: index * 0.08,
        ease: 'back.out(1.5)',
      });
    });

    return () => ctx.revert();
  }, [isInView, index, categoryKey]);

  return (
    <motion.div
      ref={cardRef}
      className="skill-card glass-effect rounded-2xl p-6 cursor-pointer group"
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
      whileHover={{
        y: -10,
        scale: 1.05,
        rotateY: 5,
        boxShadow: '0 20px 40px rgba(37, 99, 235, 0.2)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Animated Logo */}
        <motion.div
          className="skill-icon w-16 h-16 md:w-20 md:h-20 relative"
          whileHover={{ rotateY: 360 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative w-full h-full tech-logo" style={{ animationDelay: `${index * 0.2}s` }}>
            <LogoComponent />
          </div>
        </motion.div>

        {/* Skill name */}
        <span className="text-sm md:text-base font-medium text-gray-300 group-hover:text-white transition-colors text-center">
          {skill.name}
        </span>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);
  const tabsRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('frontend');
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title animation
      const title = sectionRef.current?.querySelector('.section-title-container');
      if (title) {
        gsap.fromTo(
          title,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Tabs container slide from left
      if (tabsRef.current) {
        gsap.fromTo(
          tabsRef.current,
          { opacity: 0, x: -80 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: tabsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const categories = [
    {
      key: 'frontend',
      title: t('skills.frontend'),
      icon: Code2,
      skills: skills.frontend,
      color: '#2563eb',
    },
    {
      key: 'backend',
      title: t('skills.backend'),
      icon: Server,
      skills: skills.backend,
      color: '#3b82f6',
    },
    {
      key: 'database',
      title: t('skills.database'),
      icon: Database,
      skills: skills.database,
      color: '#0ea5e9',
    },
    {
      key: 'devops',
      title: t('skills.devops'),
      icon: Cloud,
      skills: skills.devops,
      color: '#06b6d4',
    },
  ];

  return (
    <section id="skills" ref={sectionRef} className="relative py-32 overflow-hidden">
      <SectionTransition
        sectionId="skills"
        sectionName="Skills"
        command="npm run list:skills --all"
      >
        <div className="container mx-auto px-6">
          <SectionTitle title={t('skills.title')} subtitle={t('skills.subtitle')} />

        {/* Category tabs - horizontal scroll on mobile, wrapped on larger screens */}
        <div
          ref={tabsRef}
          className="flex overflow-x-auto sm:flex-wrap sm:justify-center gap-3 sm:gap-4 md:gap-5 mb-12 sm:mb-16 px-2 sm:px-4 pb-2 sm:pb-0 -mx-2 sm:mx-0 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-full transition-all text-sm sm:text-base md:text-lg font-medium whitespace-nowrap flex-shrink-0 ${
                activeCategory === category.key
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                  : 'glass-effect text-gray-400 hover:text-white hover:border-blue-500/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
            >
              <category.icon size={18} className="sm:w-5 sm:h-5" />
              {category.title}
            </motion.button>
          ))}
        </div>

        {/* Skills display - Grid of animated logos */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {categories.map(
              (category) =>
                activeCategory === category.key && (
                  <motion.div
                    key={category.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Category header */}
                    <div className="flex items-center justify-center gap-4 mb-8">
                      <div
                        className="p-4 rounded-xl"
                        style={{ backgroundColor: `${category.color}20` }}
                      >
                        <category.icon size={32} style={{ color: category.color }} />
                      </div>
                      <div className="text-center">
                        <h3 className="text-2xl font-bold">{category.title}</h3>
                        <p className="text-gray-400">
                          {category.skills.length} {t('skills.technologies')}
                        </p>
                      </div>
                    </div>

                    {/* Skills grid with animated logos */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                      {category.skills.map((skill, index) => (
                        <SkillCard
                          key={skill.name}
                          skill={skill}
                          index={index}
                          isInView={true}
                          categoryKey={category.key}
                        />
                      ))}
                    </div>
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>

        {/* Tech marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-16 overflow-hidden"
        >
          <div className="relative">
            {/* Gradient masks */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--color-background)] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--color-background)] to-transparent z-10" />

            {/* Scrolling content */}
            <motion.div
              className="flex gap-8 py-4"
              animate={{ x: [0, -1000] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              {[...skills.frontend, ...skills.backend, ...skills.database, ...skills.devops].map(
                (skill, index) => {
                  const LogoComponent = TechLogos[skill.icon];
                  return (
                    <div
                      key={`${skill.name}-${index}`}
                      className="flex items-center gap-3 px-6 py-3 glass-effect rounded-full whitespace-nowrap"
                    >
                      <div className="w-6 h-6">
                        {LogoComponent ? <LogoComponent /> : <span className="w-2 h-2 rounded-full bg-blue-500" />}
                      </div>
                      <span className="text-gray-300">{skill.name}</span>
                    </div>
                  );
                }
              )}
              {/* Duplicate for seamless loop */}
              {[...skills.frontend, ...skills.backend, ...skills.database, ...skills.devops].map(
                (skill, index) => {
                  const LogoComponent = TechLogos[skill.icon];
                  return (
                    <div
                      key={`${skill.name}-dup-${index}`}
                      className="flex items-center gap-3 px-6 py-3 glass-effect rounded-full whitespace-nowrap"
                    >
                      <div className="w-6 h-6">
                        {LogoComponent ? <LogoComponent /> : <span className="w-2 h-2 rounded-full bg-cyan-500" />}
                      </div>
                      <span className="text-gray-300">{skill.name}</span>
                    </div>
                  );
                }
              )}
            </motion.div>
          </div>
        </motion.div>
        </div>
      </SectionTransition>

      {/* Background decorations */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[130px] pointer-events-none" />
    </section>
  );
};

export default Skills;
