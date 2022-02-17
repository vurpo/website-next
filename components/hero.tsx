import Image from 'next/image';
import Link from 'next/Link';
import { FC } from 'react';

import { imageLoader } from 'contentful/imageLoader';
import { LinkButton } from './button';
import { NavigationItem } from 'contentful/client';
import heroImage from '../public/hero.jpeg';

interface HeroProps {
  image: {
    url?: string;
  };
  title: string;
  subtext: string;
  buttonText: string;
  buttonLink: string;
  navigationItems: NavigationItem[];
}

const Hero: FC<HeroProps> = ({
  image,
  title,
  subtext,
  buttonText,
  buttonLink,
  navigationItems,
}) => {
  const url = image?.url || heroImage;
  const loader = image?.url ? imageLoader : undefined;

  return (
    <div className="relative flex flex-col w-full h-128 xl:h-192">
      {/* Hero image */}
      <Image
        src={url}
        loader={loader}
        layout="fill"
        objectFit="cover"
        className="z-0 opacity-[10%]"
      />

      {/* Navigation */}
      <header className="z-10 w-screen h-16 max-w-4xl mx-auto">
        <ul className="hidden w-full md:flex justify-end">
          {navigationItems.map((navItem) => (
            <Link key={navItem.slug} href={'/' + navItem.slug}>
              <a className="p-4 text-xl text-white">{navItem.name}</a>
            </Link>
          ))}
        </ul>
      </header>

      {/* Hero content */}
      <div className="z-10 flex flex-wrap items-center justify-center h-full">
        <div className="relative h-52 w-52 lg:h-80 lg:w-80 xl:h-96 xl:w-96">
          <Image src="/leima.svg" layout="fill" />
        </div>
        <div className="p-8 text-center">
          <h1 className="text-3xl font-bold text-coral md:text-5xl">{title}</h1>
          <p className="p-4 text-xl text-white md:text-3xl">{subtext}</p>

          {buttonText && buttonLink ? (
            <LinkButton className="text-md md:text-xl" href={buttonLink}>
              {buttonText}
            </LinkButton>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Hero;
