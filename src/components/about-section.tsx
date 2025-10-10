'use client';

export default function AboutSection() {
  return (
    <section className="w-full py-16 px-4" id="about">
      <div className="mx-auto max-w-4xl">
        <div className="glass-panel p-8 md:p-12 rounded-2xl">
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-6 text-center">
            About Krish Goswami
          </h2>
          
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-lg">
              <strong className="text-primary-foreground">Krish Goswami</strong> (also known as <strong className="text-primary-foreground">Krish Yogi</strong>) is a top-rated professional developer and AI automation expert based in India. With a passion for cutting-edge technology and innovation, Krish Goswami specializes in creating impactful digital solutions that transform businesses.
            </p>
            
            <p>
              As a highly skilled web developer, <strong className="text-primary-foreground">Krish Goswami</strong> has extensive experience building modern, responsive web applications using Next.js, React, and Firebase. Krish's expertise in AI automation helps businesses streamline their workflows and achieve unprecedented efficiency.
            </p>
            
            <p>
              <strong className="text-primary-foreground">Krish Goswami</strong> is also an accomplished VFX designer, bringing creative visions to life through stunning visual effects and 3D animations using industry-standard tools like Blender. This unique combination of technical prowess and creative design sets Krish Goswami apart in the industry.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-background/50 p-6 rounded-lg border border-primary/20">
                <h3 className="font-headline text-xl font-bold mb-3 text-primary-foreground">
                  Why Choose Krish Goswami?
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>✅ Top-rated Fiverr developer with proven track record</li>
                  <li>✅ Expert in AI automation and modern web technologies</li>
                  <li>✅ Professional VFX design and 3D animation skills</li>
                  <li>✅ Fast delivery and excellent communication</li>
                  <li>✅ 100% client satisfaction guarantee</li>
                </ul>
              </div>
              
              <div className="bg-background/50 p-6 rounded-lg border border-primary/20">
                <h3 className="font-headline text-xl font-bold mb-3 text-primary-foreground">
                  Krish Goswami's Expertise
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>🚀 Next.js & React Development</li>
                  <li>🤖 AI Automation & Integration</li>
                  <li>🎨 VFX Design & 3D Animation</li>
                  <li>🔥 Firebase & Backend Solutions</li>
                  <li>💼 Full-Stack Web Development</li>
                </ul>
              </div>
            </div>
            
            <p className="text-center mt-8 text-lg">
              Looking to hire <strong className="text-primary-foreground">Krish Goswami</strong> for your next project? 
              Get in touch today and let's build something amazing together!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
