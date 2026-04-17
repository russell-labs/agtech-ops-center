export interface HubNewsletter {
  name: string;
  by: string;
  freq: string;
  desc: string;
  url: string;
  icon: string;
  isHeader?: boolean;
}

export interface HubCommunity {
  name: string;
  type: string;
  by: string;
  desc: string;
  url: string;
  icon: string;
}

export interface HubEvent {
  name: string;
  date: string;
  location: string;
  desc: string;
  url: string;
  icon: string;
}

export interface HubPodcast {
  name: string;
  desc: string;
  type: string;
  tag: string;
  icon: string;
  url?: string;
}

export interface HubLeader {
  name: string;
  role: string;
  focus: string;
  desc: string;
  linkedin?: string;
}

export const HUB_NEWSLETTERS: HubNewsletter[] = [
  { name:'Best of AgTech Newsletters', by:'FounderOps Curated', freq:'Curated', desc:'All the newsletters below are hand-picked for AgTech professionals — subscribe to any that match your focus.', url:'', icon:'⭐', isHeader:true },
  { name:'AgFunderNews', by:'AgFunder', freq:'Weekly', desc:'Industry-leading weekly newsletter covering global agri-food tech with deep reporting and analysis for 100K+ subscribers.', url:'https://agfundernews.com/newsletter', icon:'💰' },
  { name:'iGrow News AgTech Digest', by:'Sepehr Achard', freq:'Weekly (Fri)', desc:'Free weekly recap of AgTech headlines across precision ag, vertical farming, biotech, robotics, and data.', url:'https://igrownews.com/ag-newsletter/', icon:'🌿' },
  { name:'The Signal', by:'Global Ag Tech Initiative', freq:'Weekly', desc:'High-level analysis of global AgTech trends, regulation, and innovation for ag-tech decision-makers.', url:'https://www.globalagtechinitiative.com/thesignal/', icon:'📡' },
  { name:'Future Farming', by:'Misset/Beselink Group', freq:'Weekly', desc:'Leading smart farming and precision ag brand covering the latest news and insights in ag-tech.', url:'https://www.futurefarming.com/newsletter/', icon:'🚜' },
  { name:'AgriTechTomorrow', by:'AgriTechTomorrow', freq:'Monthly', desc:'Industry news on precision farming, supply chain, indoor/vertical farming, and agricultural technology.', url:'https://www.agritechtomorrow.com/subscribe.php', icon:'🔬' },
  { name:'Vertical Farm Daily', by:'Vertical Farm Daily', freq:'Daily', desc:'Daily newsletter covering indoor farming and controlled environment agriculture (CEA) news globally.', url:'https://www.verticalfarmdaily.com/subscribe/', icon:'🏢' },
  { name:'FarmProgress', by:'Farm Progress', freq:'Multiple/week', desc:'Free e-newsletters covering farm technology, market news, weather, and agribusiness developments.', url:'https://pgs.farmprogress.com/newsletter-signup', icon:'📊' },
  { name:'Food Tank', by:'Food Tank', freq:'Weekly (Thu)', desc:'Food system leaders, regenerative agriculture, sustainability stories, and food system transformation.', url:'https://foodtank.com/news/category/food-tank-newsletter/', icon:'🍽️' },
  { name:'AgTech Navigator', by:'Agri-Tech Navigator', freq:'Regular', desc:'Free news on global ag-tech and agri-food innovation, investment, and regulation.', url:'https://www.agtechnavigator.com/', icon:'🧭' },
  { name:'Agri-TechE', by:'Agri-TechE (UK)', freq:'Monthly', desc:'Monthly agri-tech news, events, and opportunities from the UK agri-tech cluster.', url:'https://www.agri-tech-e.co.uk/sign-up/', icon:'🇬🇧' },
  { name:'EMILI Newsletter', by:'EMILI Canada', freq:'Regular', desc:'Digital agriculture innovation updates, tech adoption news, and Canadian agtech ecosystem insights.', url:'https://emilicanada.com/newsletter/', icon:'🇨🇦' },
  { name:'CDL Newsletter', by:'Creative Destruction Lab', freq:'Regular', desc:"News from CDL's global network of science and tech ventures including AgriFood stream updates.", url:'https://creativedestructionlab.com/sign-up-news/', icon:'💡' },
];

export const HUB_COMMUNITIES: HubCommunity[] = [
  { name:'AgTech Alchemy', type:'Slack + Meetups', by:'Walt Duflock, Sachi Desai, Rhishi Pethe', desc:'Brings founders, operators, investors, and practitioners together in-person and via Slack to share real experience.', url:'https://www.linkedin.com/company/agtech-alchemy', icon:'⚗️' },
  { name:'AgChat & Chew', type:'Biweekly Zoom Meeting', by:'Andrew Rose', desc:'Biweekly AgTech networking call — every other Friday 9:30–10:30am ET. Email Andrew to get the calendar invite.', url:'mailto:andrew@chesapeakesun.com?subject=AgChat%20%26%20Chew%20-%20Request%20to%20Join&body=Hi%20Andrew%2C%20I%20found%20AgChat%20%26%20Chew%20on%20FounderOps%20Center%20and%20would%20love%20to%20join.%20Please%20send%20me%20the%20calendar%20invite!', icon:'☕' },
  { name:'AgRobotics Working Group', type:'Weekly Working Group', by:'Dan (arwg@westernfairdistrict.com)', desc:'Weekly agenda-driven working group advancing ag robotics and automation in Canada. Email Dan to join.', url:'mailto:arwg@westernfairdistrict.com?subject=AgRobotics%20Working%20Group%20-%20Request%20to%20Join', icon:'🤖' },
  { name:'Founders Network — AgTech', type:'Founder Community', by:'Founders Network', desc:'Full-lifecycle mentoring support for AgTech founders from funding rounds to corporate and government partnerships.', url:'https://foundersnetwork.com/mentoring-programs/agtech-founders/', icon:'🚀' },
  { name:'The Farming Community', type:'Discord', by:'Community-run (16K+ members)', desc:'Welcoming space for farmers, students, professionals, and enthusiasts worldwide to learn, teach, and grow.', url:'https://discord.com/invite/farming', icon:'💬' },
  { name:'Cultivator', type:'Accelerator + Network', by:'Cultivator (Saskatchewan)', desc:'Venture capital-backed 3-month accelerator helping AgTech startups achieve product-market fit and scale.', url:'https://www.cultivator.ca', icon:'🌾' },
  { name:'Creative Destruction Lab — AgriFood', type:'Accelerator + Mentorship', by:'CDL (Calgary / Doha)', desc:'Free 9-month mentorship program for seed-stage ag and food tech companies — no equity taken.', url:'https://creativedestructionlab.com/streams/ag/', icon:'💡' },
  { name:'EMILI', type:'Innovation Network', by:'Enterprise Machine Intelligence & Learning Initiative', desc:'Industry-led non-profit supporting digital agriculture innovation and tech adoption across Canada.', url:'https://emilicanada.com', icon:'🇨🇦' },
  { name:'Grand Farm', type:'Innovation Campus', by:'Grand Farm (North Dakota)', desc:'Collaborative network of growers, corporations, startups, and researchers on a 590-acre innovation campus.', url:'https://grandfarm.com', icon:'🏗️' },
  { name:'Plug and Play AgTech', type:'Accelerator + Network', by:'Plug and Play', desc:'Connects startups with corporate partners (Corteva, Nestlé, Bayer, PepsiCo). Digital farming, AI, IoT focus.', url:'https://www.plugandplayapac.com/food', icon:'🔌' },
  { name:'WET Center', type:'Incubator + Accelerator', by:'Fresno State', desc:'Supports water, energy, and agricultural technology entrepreneurs through commercialization training and industry networking.', url:'https://www.wetcenter.org', icon:'💧' },
  { name:'Agri-TechE Network (UK)', type:'Professional Network', by:'Agri-TechE', desc:'Connects farmers, growers, scientists, technologists and entrepreneurs to turn challenges into opportunities.', url:'https://uk.linkedin.com/company/agri-tech-e', icon:'🔗' },
];

export const HUB_EVENTS: HubEvent[] = [
  { name:'Animal AgTech Innovation Summit', date:'Apr 8–9, 2026', location:'Fort Worth, TX', desc:'500+ senior executives from livestock and dairy sectors, 13 high-growth startups, live pitching sessions.', url:'https://animalagtech.com/', icon:'🐄' },
  { name:'FoodBytes! 2026', date:'Jun 3, 2026', location:'Utrecht, Netherlands', desc:"Rabobank's multi-continent platform — accelerator, pitch competition, and mentorship.", url:'https://www.foodbytesworld.com/', icon:'🍏' },
  { name:'World Agri-Tech South America', date:'Jun 23–24, 2026', location:'São Paulo', desc:'Latin American agri-tech innovation summit connecting regional and global leaders.', url:'https://www.worldagritechsouthamerica.com/', icon:'🇧🇷' },
  { name:'World Agri-Tech London', date:'Sep 22–23, 2026', location:'London', desc:'European edition of the premier agri-tech innovation summit.', url:'https://worldagritechusa.com/', icon:'🇬🇧' },
  { name:'Agriculture Webinar Portal', date:'Ongoing', location:'Virtual', desc:'Live and on-demand agriculture webinars, videos, and training from USDA, universities, and ag organizations.', url:'https://agwebinars.net/', icon:'💻' },
  { name:'AGRI Tech Venture Forum', date:'Check site', location:'Various', desc:'Premium networking event for ag tech executives, entrepreneurs, investors, and corporate strategics with startup showcases.', url:'https://agritechventureforum.com/', icon:'🏛️' },
];

export const HUB_PODCASTS: HubPodcast[] = [
  { name:'Future of Agriculture', desc:'Conversations with farmers, entrepreneurs, and researchers about agricultural innovation.', type:'Podcast', tag:'Interviews', icon:'🎙️', url:'https://www.futureofagriculture.com/' },
  { name:'AgTech...So What?', desc:"Sarah Nolet's podcast exploring technology adoption, commercialization, and real-world impact in agriculture.", type:'Podcast', tag:'Strategy', icon:'🎧', url:'https://www.agthentic.com/podcast' },
  { name:'FarmBits', desc:'Weekly ag tech news, startup funding updates, and industry analysis.', type:'Podcast', tag:'News', icon:'📻', url:'https://farmbits.transistor.fm/' },
  { name:'Vertical Farming Podcast', desc:'CEA technology, indoor farming innovations, and controlled environment agriculture business models.', type:'Podcast', tag:'CEA', icon:'🏢', url:'https://verticalfarmpodcast.com/' },
  { name:'Groundbreakers', desc:"Syngenta's podcast featuring innovators in agriculture, sustainability, and regenerative practices.", type:'Podcast', tag:'Innovation', icon:'🌱', url:'https://www.syngenta.com/en/innovation-agriculture/groundbreakers-podcast' },
  { name:'AgFunder Network', desc:'Video interviews with agri-food tech founders, investors, and industry leaders.', type:'YouTube', tag:'Video', icon:'📺', url:'https://www.youtube.com/@AgFunderNetwork' },
];

export const HUB_LEADERS: HubLeader[] = [
  { name:'Darren Anderson', role:'Co-Founder & CEO, Vive Crop Protection', focus:'Biotech', desc:'Canadian founder of nanotechnology-based crop protection products with 100+ patents.' },
  { name:'David Friedberg', role:'CEO, The Production Board', focus:'Biotech', desc:'Climate tech and agricultural biotech investor; founder of Climate Corporation.' },
  { name:'Evan Nisselson', role:'General Partner, LDV Capital', focus:'Investment', desc:'Leading AI and computer vision venture fund with significant AgTech portfolio.' },
  { name:'Karen Schuett', role:'Co-Founder & CEO, Livestock Water Recycling', focus:'Livestock Tech', desc:'Named one of six most influential women in Canadian agriculture.' },
  { name:'Kimbal Musk', role:'Co-Founder, Big Green & Square Roots', focus:'Sustainability', desc:'Urban farming entrepreneur and food systems advocate.' },
  { name:'Louisa Burwood-Taylor', role:'Head of Media, AgFunder', focus:'Investment', desc:'Expert on agri-food tech investment trends and startup ecosystems.' },
  { name:'Michael Gilbert', role:'Founder, Semios', focus:'IoT', desc:'Pioneer in agricultural IoT and precision irrigation from Vancouver.' },
  { name:'Ranveer Chandra', role:'VP & CTO Agri-Food, Microsoft', focus:'AI / IoT', desc:"Led Microsoft FarmBeats; named one of Newsweek's 50 Most Disruptive Innovators." },
  { name:'Rob Trice', role:'Founder, Better Food Ventures', focus:'VC / Investor', desc:'Early-stage AgTech investor focused on sustainable food systems.' },
  { name:'Robert Saik', role:'CEO & Founder, AGvisorPRO', focus:'Digital Platform', desc:"Named one of Canada's Top 50 Most Influential Agriculture Leaders." },
  { name:'Sara Menker', role:'Founder & CEO, Gro Intelligence', focus:'AgData / AI', desc:'Data scientist using AI to forecast agricultural and climate trends.' },
  { name:'Sarah Nolet', role:'Co-Founder, AgThentic', focus:'Strategy', desc:'Innovation strategy, adoption barriers, and practical AgTech implementation.' },
  { name:'Sylvain Charlebois', role:'Director, Agri-Food Analytics Lab', focus:'Policy', desc:"Canadian food systems researcher; author of Canada's Food Price Report." },
  { name:'Vonnie Estes', role:'VP of Innovation, IFPA', focus:'Fresh Produce', desc:'Leading voice on food tech, supply chain innovation, and produce technology.' },
  { name:'Walt Duflock', role:'VP Innovation, Western Growers', focus:'Community', desc:'AgTech entrepreneur, mentor list curator, and advocate for farm profitability.' },
];
