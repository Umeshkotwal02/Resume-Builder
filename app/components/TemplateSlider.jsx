"use client";

import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";

// Import local images
import resume1 from "../assets/images/resume1.webp";
import resume2 from "../assets/images/resume4.webp";
import resume3 from "../assets/images/resume3.webp";

const templates = [
  { id: 1, img: resume1, link: "/template" },
  { id: 2, img: resume2, link: "/template" },
  { id: 3, img: resume3, link: "/template" },
  { id: 4, img: resume1, link: "/template" },
];

export default function TemplateSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="template-slider">
      <Slider {...settings}>
        {templates.map((tpl) => (
          <div key={tpl.id} className="template-card">
            <Link href={tpl.link}>
              <div className="image-wrap">
                <Image
                  src={tpl.img}
                  alt={`Template ${tpl.id}`}
                  width={300}
                  height={400}
                  className="rounded shadow"
                />
                <div className="overlay">
                  <span className="choose-btn">Choose Template</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}
