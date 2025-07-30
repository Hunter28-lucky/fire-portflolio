'use client';

export default function SplineSection() {
  return (
    <section className="relative h-[400px] w-full md:h-[600px] -mt-24 md:-mt-48">
      <spline-viewer
        loading-anim-type="spinner-small-dark"
        url="https://prod.spline.design/XVb4L3YwyNlw6ppz/scene.splinecode"
      />
    </section>
  );
}
