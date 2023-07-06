import React from 'react';
import { HeroSection } from './components/HeroSection/HeroSection';
import { VideosSection } from './components/VideosSection/VideosSection';
import { HeroVideo } from './components/HeroVideo/HeroVideo';

export const Home = () => {
	return (
		<div className="home-page">
			<div className="hero">
				<HeroVideo />
				<HeroSection />
				<VideosSection />
			</div>
		</div>
	);
};
