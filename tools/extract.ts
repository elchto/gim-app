type Region = "Americas" | "Europe" | "Middle East" | "Asia-Pacific" | "Africa";
type RegionFilter = "All" | Region;
type CountryCode =
  | "US" | "CN" | "RU" | "UA" | "IL" | "IN" | "JP" | "DE" | "GB" | "FR" | "BR" | "SA" | "IR" | "ID" | "MY";

interface NewsItem {
  headline: string;
  summary: string;
  date: string;
  region: Region;
  countries: CountryCode[];
  source: string;
  url: string;
}

const NEWS: NewsItem[] = [
  {
    headline: "Democrats win control of both houses of the US Congress",
    summary: "In the 3 November midterms, Democrats took the House and the Senate in a sharp rebuke of President Trump. Democracy Now reports at least 231 House seats and at least seven Senate pickups, with Mississippi and Alaska still too close to call.",
    date: "4 Nov 2026",
    region: "Americas",
    countries: ["US"],
    source: "Kyodo News / Democracy Now",
    url: "https://english.kyodonews.net/articles/-/90209",
  },
  {
    headline: "Trump says US military aid to Israel will end",
    summary: "Trump told Fox News the roughly $4 billion in yearly US military aid to Israel will be cut off at the end of this year, though weapons sales will continue.",
    date: "3 Nov 2026",
    region: "Americas",
    countries: ["US", "IL"],
    source: "Xinhua",
    url: "https://english.news.cn/20261104/dafb18a96f514e0d9bb3c190ef92702c/c.html",
  },
  {
    headline: "Wall Street rallies after the Democratic sweep",
    summary: "In early trade the Dow rose 2.3%, the S&P 500 1.72% and the Nasdaq 2.13%, as investors bet a divided Washington limits sharp policy shifts. Defence and data centre stocks fell.",
    date: "4 Nov 2026",
    region: "Americas",
    countries: ["US"],
    source: "Business Standard (Reuters)",
    url: "https://www.business-standard.com/world-news/wall-street-rallies-after-democrats-win-congress-data-center-stocks-slide-126110402050_1.html",
  },
  {
    headline: "Tokyo stocks fall as Democrats retake Congress",
    summary: "The Nikkei closed down 1.42% at 62,188.63 after briefly dropping toward 60,000. Tokyo said the US alliance stays essential whatever the result.",
    date: "4 Nov 2026",
    region: "Asia-Pacific",
    countries: ["JP", "US"],
    source: "Kyodo News",
    url: "https://english.kyodonews.net/articles/-/90209",
  },
  {
    headline: "Death toll from Russian strike on Zaporizhzhia school rises to 40",
    summary: "Glide bombs hit a school used as an aid point in Komyshuvakha on 2 November, hours after a six-day local truce around Oleshky ended. Zelenskyy says 40 are now confirmed dead.",
    date: "4 Nov 2026",
    region: "Europe",
    countries: ["UA", "RU"],
    source: "The Guardian",
    url: "https://www.theguardian.com/world/2026/nov/04/all",
  },
  {
    headline: "US to host Ukraine-Russia talks in Abu Dhabi on 10-11 November",
    summary: "US envoy Steve Witkoff said the working-level talks will cover post-war security, de-escalation, humanitarian steps and ending the war. They are the first three-way talks since February.",
    date: "2 Nov 2026",
    region: "Europe",
    countries: ["UA", "RU", "US"],
    source: "Reuters",
    url: "https://www.reuters.com/5f374b32b07b/world/europe/us-hold-trilateral-talks-with-ukraine-russia-abu-dhabi-next-week-us-official-2026-11-02/",
  },
  {
    headline: "Merz says Russia must finally negotiate seriously",
    summary: "At a Berlin press conference with Zelenskyy, Chancellor Merz called the Abu Dhabi talks the right step but said he had seen no sign of serious Russian engagement.",
    date: "3 Nov 2026",
    region: "Europe",
    countries: ["DE", "UA", "RU"],
    source: "The Independent",
    url: "https://www.independent.co.uk/news/world/europe/ukraine-russia-war-live-putin-zelensky-melania-trump-peace-talks-b3078752.html",
  },
  {
    headline: "US strikes Iran's Qeshm Island in the Strait of Hormuz",
    summary: "US officials called the strikes limited and defensive, after Iranian forces fired on US assets. It was the first US attack on the island since June, while Qatari mediation continues.",
    date: "3 Nov 2026",
    region: "Middle East",
    countries: ["US", "IR"],
    source: "Al Jazeera",
    url: "https://www.aljazeera.com/news/2026/11/3/us-hits-qeshm-island-pezeshkian-signals-more-diplomacy-iran-war-latest",
  },
  {
    headline: "Iran warns of response 'without geographical limitations'",
    summary: "Armed forces chief of staff Ali Abdollahi said Iran would meet any US or Israeli threat with an immediate response. Iran's seven-point plan to end the war is still with mediators.",
    date: "3 Nov 2026",
    region: "Middle East",
    countries: ["IR"],
    source: "Xinhua",
    url: "https://english.news.cn/20261104/dafb18a96f514e0d9bb3c190ef92702c/c.html",
  },
  {
    headline: "Israel certifies election results; Herzog starts coalition talks",
    summary: "Netanyahu's bloc won 53 seats, Eisenkot's opposition bloc 48 and Arab-led parties a record 19, so no bloc has the 61 needed. The election committee rejected fraud claims.",
    date: "4 Nov 2026",
    region: "Middle East",
    countries: ["IL"],
    source: "Al Jazeera",
    url: "https://www.aljazeera.com/news/2026/11/4/israel-vote-results-confirmed-as-election-commission-rejects-fraud-claims",
  },
  {
    headline: "Houthi-Saudi fighting widens; US pulls non-emergency staff",
    summary: "Yemen's Houthis claimed missile and drone attacks on Saudi airports and oil sites, mostly unverified. The US ordered non-emergency government staff to leave Saudi Arabia.",
    date: "1 Nov 2026",
    region: "Middle East",
    countries: ["SA"],
    source: "Vocemundi weekly review",
    url: "https://vocemundi.com/the-week-2026-11-01/",
  },
  {
    headline: "Saudi crown prince hosts Syria's President al-Sharaa",
    summary: "Mohammed bin Salman received Ahmed al-Sharaa in Riyadh for talks on security, counterterrorism and economic ties.",
    date: "4 Nov 2026",
    region: "Middle East",
    countries: ["SA"],
    source: "Saudi Gazette",
    url: "https://saudigazette.com.sa/article/665998/saudi-arabia/crown-prince-receives-syrian-president-al-sharaa-in-riyadh",
  },
  {
    headline: "Iotova re-elected president of Bulgaria",
    summary: "Incumbent Iliana Iotova won Sunday's runoff with 57.58% of the vote against former caretaker PM Andrey Gurov.",
    date: "3 Nov 2026",
    region: "Europe",
    countries: [],
    source: "Xinhua",
    url: "https://english.news.cn/20261104/dafb18a96f514e0d9bb3c190ef92702c/c.html",
  },
  {
    headline: "Spain's transport minister quits after deadly train crashes",
    summary: "Oscar Puente resigned after the 28 October Urda crash. Deputy PM Carlos Cuerpo runs the ministry until the 29 November snap election.",
    date: "4 Nov 2026",
    region: "Europe",
    countries: [],
    source: "Reuters via Devdiscourse",
    url: "https://www.devdiscourse.com/article/international/4001613-reuters-world-news-summary",
  },
  {
    headline: "Eurozone inflation rises to 4.0%",
    summary: "Eurostat's flash estimate for October is 4.0%, up from 3.8%, driven by energy prices up 20.8% on a year earlier.",
    date: "4 Nov 2026",
    region: "Europe",
    countries: ["DE", "FR"],
    source: "Eurostat",
    url: "https://ec.europa.eu/eurostat/en/web/products-euro-indicators/w/2-04112026-ap",
  },
  {
    headline: "Montenegro could sign EU accession treaty in June 2027",
    summary: "The European Commission said talks with Montenegro could close by the end of this year, the first since Croatia in 2011.",
    date: "4 Nov 2026",
    region: "Europe",
    countries: [],
    source: "Reuters via Devdiscourse",
    url: "https://www.devdiscourse.com/article/international/4001613-reuters-world-news-summary",
  },
  {
    headline: "Cyberattack hits French blood banks",
    summary: "Officials said no samples were compromised. It follows reports of supermarket fridges in several European countries being remotely taken over.",
    date: "4 Nov 2026",
    region: "Europe",
    countries: ["FR"],
    source: "Euronews",
    url: "https://www.euronews.com/2026/11/04",
  },
  {
    headline: "British health worker with Ebola to be flown from DR Congo to UK",
    summary: "The patient is stable. DR Congo's outbreak passed 5,000 deaths by 30 October, its deadliest on record, with cases also in Uganda, Kenya and Nigeria.",
    date: "4 Nov 2026",
    region: "Africa",
    countries: ["GB"],
    source: "The Guardian / Vocemundi",
    url: "https://www.theguardian.com/world/2026/nov/04/all",
  },
  {
    headline: "South Africans vote in local elections seen as a test for the ANC",
    summary: "Voters chose councillors in 257 municipalities amid anger over poor services. Final results were not yet out.",
    date: "4 Nov 2026",
    region: "Africa",
    countries: [],
    source: "Al Jazeera",
    url: "https://www.aljazeera.com/news/2026/11/4/south-africans-vote-in-local-elections-seen-as-test-for-embattled-anc",
  },
  {
    headline: "Drone attacks push Sudan's power grid toward collapse",
    summary: "At least 15 substations have been hit since early October. The UN envoy says talks with the RSF and its allies are expected before Christmas.",
    date: "4 Nov 2026",
    region: "Africa",
    countries: [],
    source: "The Soufan Center",
    url: "https://thesoufancenter.org/intelbrief-2026-november-4/",
  },
  {
    headline: "Prabowo sacks chief of staff over alleged wiretapping",
    summary: "Indonesia's president dismissed Listyo Sigit Prabowo after he and two senior police officers were detained over alleged illegal wiretapping of the president and others.",
    date: "4 Nov 2026",
    region: "Asia-Pacific",
    countries: ["ID"],
    source: "The Jakarta Post",
    url: "https://www.thejakartapost.com/indonesia/2026/11/04/president-prabowo-sacks-chief-of-staff-listyo-for-alleged-wiretapping-",
  },
  {
    headline: "Anwar shores up government with opposition deal",
    summary: "Malaysia's prime minister signed a confidence and supply agreement with 13 opposition MPs backing the 2027 budget and reforms.",
    date: "3 Nov 2026",
    region: "Asia-Pacific",
    countries: ["MY"],
    source: "Business Today Malaysia",
    url: "https://www.businesstoday.com.my/2026/11/03/anwar-has-fewer-excuses-for-delayed-reforms-after-csa-analysts-say/",
  },
  {
    headline: "Anwar warns Malaysia is a cyberattack target",
    summary: "The prime minister ordered top-level security briefings and urged the public to stay calm and alert.",
    date: "4 Nov 2026",
    region: "Asia-Pacific",
    countries: ["MY"],
    source: "The Star",
    url: "https://www.thestar.com.my/news/nation/2026/11/04/keep-calm-and-stay-alert-says-anwar",
  },
  {
    headline: "Modi opens Pune Metro Line 3",
    summary: "Modi said India's metro network grew from 248 km in 2014 to about 1,200 km across 26 cities.",
    date: "3 Nov 2026",
    region: "Asia-Pacific",
    countries: ["IN"],
    source: "The Hindu",
    url: "https://www.thehindu.com/news/national/maharashtra/pm-modi-pune-metro-line-inauguration-india-network-nov-3-2026/article71660288.ece",
  },
  {
    headline: "Xi pledges 'high-standard opening up' before Shanghai import expo",
    summary: "Xi said China will keep economic globalisation open and inclusive, as Beijing urged APEC members to uphold free trade.",
    date: "4 Nov 2026",
    region: "Asia-Pacific",
    countries: ["CN"],
    source: "CGTN",
    url: "https://news.cgtn.com/news/2026-11-04/President-Xi-Jinping-s-key-remarks-on-high-standard-opening-up-1RNogdiZkys/p.html",
  },
  {
    headline: "US-China trade truce holds, extended to January",
    summary: "The Guardian notes the truce has stopped tit-for-tat tariffs, but both sides keep tightening controls on chips and critical minerals.",
    date: "1 Nov 2026",
    region: "Asia-Pacific",
    countries: ["CN", "US"],
    source: "The Guardian",
    url: "https://www.theguardian.com/world/2026/nov/01/us-china-trade-war-trump-xi",
  },
  {
    headline: "Opposition criticises Takaichi for skipping G7 meeting",
    summary: "Japan's opposition stepped up criticism of Prime Minister Sanae Takaichi for missing last month's G7 meeting.",
    date: "4 Nov 2026",
    region: "Asia-Pacific",
    countries: ["JP"],
    source: "The Japan Times",
    url: "https://www.japantimes.co.jp/news/2026/11/04/japan/politics/opposition-takaichi-g7-criticism-mounts/",
  },
  {
    headline: "Burnham says US midterms create an 'opportunity'",
    summary: "UK Prime Minister Andy Burnham said the result lets the world focus on the cost of living and ending the Iran war.",
    date: "4 Nov 2026",
    region: "Europe",
    countries: ["GB", "US"],
    source: "The Guardian",
    url: "https://www.theguardian.com/politics/live/2026/nov/04/ed-miliband-andy-burnham-king-charles-labour-louise-haigh-alex-burghart-pmqs-conservatives-uk-politics-latest-news",
  },
  {
    headline: "Lula wins a fourth term; Flavio Bolsonaro contests result",
    summary: "Lula won the 25 October runoff with 51.79% of valid votes to 48.21%. Bolsonaro refused to concede, though his party recognised the result.",
    date: "26 Oct 2026",
    region: "Americas",
    countries: ["BR"],
    source: "O Globo / Vocemundi",
    url: "https://oglobo.globo.com/apuracao-eleicoes-2026/noticia/2026/10/26/resultado-das-eleicoes-2026-no-2o-turno-veja-a-apuracao-final-do-tse-para-presidente.ghtml",
  },
  {
    headline: "Brazil publishes first global roadmap to phase out fossil fuels",
    summary: "Brazil urged countries to start planning now for a voluntary phase-out of coal, oil and gas, days before COP31.",
    date: "4 Nov 2026",
    region: "Americas",
    countries: ["BR"],
    source: "Euronews",
    url: "https://www.euronews.com/2026/11/04",
  },
];

type ConflictStatus = { label: string; tone: "danger" | "warning" | "neutral" | "accent" };

interface Conflict {
  name: string;
  parties: string;
  status: ConflictStatus;
  latest: string;
  date: string;
  source: string;
  url: string;
}

const CONFLICTS: Conflict[] = [
  {
    name: "Russia-Ukraine war",
    parties: "Russia, Ukraine (US mediating)",
    status: { label: "Escalating", tone: "danger" },
    latest: "Strikes resumed after a six-day Oleshky truce ended; the Komyshuvakha school strike killed 40. Talks set for Abu Dhabi on 10-11 Nov.",
    date: "4 Nov 2026",
    source: "The Guardian",
    url: "https://www.theguardian.com/world/2026/nov/04/all",
  },
  {
    name: "US/Israel-Iran war",
    parties: "US, Israel, Iran (Qatar, Pakistan mediating)",
    status: { label: "Talks and strikes", tone: "warning" },
    latest: "Began 28 Feb 2026. A June deal collapsed; the US struck Qeshm Island on 2-3 Nov while Qatar passes drafts. Hormuz shipping still disrupted.",
    date: "3 Nov 2026",
    source: "Al Jazeera",
    url: "https://www.aljazeera.com/news/2026/11/3/us-hits-qeshm-island-pezeshkian-signals-more-diplomacy-iran-war-latest",
  },
  {
    name: "Houthis vs Saudi-led coalition (Yemen)",
    parties: "Houthis, Saudi Arabia, Egypt (authorised support)",
    status: { label: "Widening", tone: "danger" },
    latest: "Claimed attacks on Saudi airports and oil sites; Taiz under siege with shortages. The 2022 UN truce has broken down.",
    date: "1 Nov 2026",
    source: "Vocemundi",
    url: "https://vocemundi.com/the-week-2026-11-01/",
  },
  {
    name: "Gaza",
    parties: "Israel, Hamas (Egypt, Qatar, Turkey, US mediating)",
    status: { label: "Fragile ceasefire", tone: "warning" },
    latest: "The October 2025 ceasefire holds loosely; Hamas is in Cairo for second-phase talks on withdrawal, disarmament and governance.",
    date: "4 Nov 2026",
    source: "Ilke News Agency",
    url: "https://ilkha.com/english/world/hamas-delegation-arrives-in-cairo-for-new-round-of-gaza-ceasefire-talks-550914",
  },
  {
    name: "Israel-Hezbollah (Lebanon)",
    parties: "Israel, Hezbollah, Lebanon",
    status: { label: "Ongoing", tone: "neutral" },
    latest: "Israeli shelling and a drone strike in southern Lebanon; Israel presses Beirut to keep Hezbollah out of any renewed Iran war.",
    date: "4 Nov 2026",
    source: "The Times of Israel",
    url: "https://www.timesofisrael.com/israel-said-pressing-lebanon-to-prevent-hezbollah-from-joining-renewed-war-with-iran/",
  },
  {
    name: "Sudan civil war",
    parties: "Sudanese Armed Forces, Rapid Support Forces",
    status: { label: "Escalating", tone: "danger" },
    latest: "Drone attacks on at least 15 substations since early October. UN expects talks with the RSF bloc before Christmas; no ceasefire.",
    date: "4 Nov 2026",
    source: "The Soufan Center",
    url: "https://thesoufancenter.org/intelbrief-2026-november-4/",
  },
];

interface PolItem {
  date: string;
  title: string;
  detail: string;
  status?: { label: string; tone?: "success" | "warning" | "danger" };
  source: string;
  url: string;
}

const POLITICS: PolItem[] = [
  {
    date: "3-4 Nov",
    title: "US midterms: Democrats take House and Senate",
    detail: "Wins include Senate seats in Texas, Maine, Ohio, North Carolina, South Carolina, Iowa, Kansas and Michigan; Democrats also won a majority of governorships.",
    status: { label: "Power shift" },
    source: "Democracy Now",
    url: "https://www.democracynow.org/2026/11/4/headlines",
  },
  {
    date: "4 Nov",
    title: "Israel: results certified, coalition talks begin",
    detail: "Opposition leaders back Gadi Eisenkot. The chosen candidate gets 28 days, extendable by 14; a new election is possible if talks fail.",
    status: { label: "Deadlock", tone: "warning" },
    source: "Al Jazeera",
    url: "https://www.aljazeera.com/news/2026/11/4/israel-vote-results-confirmed-as-election-commission-rejects-fraud-claims",
  },
  {
    date: "25 Oct",
    title: "Brazil: Lula re-elected for a fourth term",
    detail: "51.79% to 48.21% over Flavio Bolsonaro, who says he will seek annulment.",
    source: "O Globo",
    url: "https://oglobo.globo.com/apuracao-eleicoes-2026/noticia/2026/10/26/resultado-das-eleicoes-2026-no-2o-turno-veja-a-apuracao-final-do-tse-para-presidente.ghtml",
  },
  {
    date: "3 Nov",
    title: "Bulgaria: President Iotova wins a new mandate",
    detail: "Official results gave her 57.58% in the runoff.",
    source: "Xinhua",
    url: "https://english.news.cn/20261104/dafb18a96f514e0d9bb3c190ef92702c/c.html",
  },
  {
    date: "3-4 Nov",
    title: "Spain: cabinet reshuffle before snap election",
    detail: "Transport minister Oscar Puente resigned; Sanchez had called a general election for 29 November.",
    source: "La Moncloa / Reuters",
    url: "https://www.lamoncloa.gob.es/lang/en/presidente/news/paginas/2026/20261005-institutional-statement.aspx",
  },
  {
    date: "4 Nov",
    title: "South Africa: local elections test the ANC",
    detail: "Councillors chosen in 257 municipalities; results pending as of this snapshot.",
    source: "Al Jazeera",
    url: "https://www.aljazeera.com/news/2026/11/4/south-africans-vote-in-local-elections-seen-as-test-for-embattled-anc",
  },
  {
    date: "4 Nov",
    title: "Indonesia: presidential chief of staff dismissed",
    detail: "Listyo Sigit Prabowo sacked amid an illegal wiretapping probe.",
    source: "The Jakarta Post",
    url: "https://www.thejakartapost.com/indonesia/2026/11/04/president-prabowo-sacks-chief-of-staff-listyo-for-alleged-wiretapping-",
  },
  {
    date: "3 Nov",
    title: "Malaysia: Anwar signs deal with 13 opposition MPs",
    detail: "A confidence and supply agreement backing the 2027 budget and reforms.",
    source: "Business Today Malaysia",
    url: "https://www.businesstoday.com.my/2026/11/03/anwar-has-fewer-excuses-for-delayed-reforms-after-csa-analysts-say/",
  },
  {
    date: "3 Nov",
    title: "US: Trump announces end of military aid to Israel",
    detail: "About $4 billion a year, to stop at the end of 2026; arms sales continue.",
    source: "Democracy Now / Xinhua",
    url: "https://www.democracynow.org/2026/11/4/headlines",
  },
  {
    date: "4 Nov",
    title: "EU: Montenegro close to finishing accession talks",
    detail: "The Commission's enlargement report says a treaty could be signed in June 2027.",
    source: "Reuters via Devdiscourse",
    url: "https://www.devdiscourse.com/article/international/4001613-reuters-world-news-summary",
  },
];

interface UpcomingItem {
  date: string;
  event: string;
  place: string;
  kind: "Politics" | "Economy";
  source: string;
  url: string;
}

const UPCOMING: UpcomingItem[] = [
  { date: "5 Nov", event: "Bank of England rate decision", place: "London", kind: "Economy", source: "Bank of England", url: "https://www.bankofengland.co.uk/monetary-policy-summary-and-minutes/2026/november-2026" },
  { date: "5 Nov", event: "Israel: Herzog ends consultations, then picks a candidate to form a government", place: "Jerusalem", kind: "Politics", source: "Al Jazeera", url: "https://www.aljazeera.com/news/2026/11/4/israel-vote-results-confirmed-as-election-commission-rejects-fraud-claims" },
  { date: "6 Nov", event: "US jobs report for October", place: "Washington", kind: "Economy", source: "BLS", url: "https://www.bls.gov/schedule/2026/11_sched.htm" },
  { date: "9-20 Nov", event: "COP31 climate conference (leaders' summit 11-12 Nov)", place: "Antalya, Turkey", kind: "Politics", source: "UNFCCC", url: "https://unfccc.int/sites/default/files/resource/notification_to_un_cop31.pdf" },
  { date: "10 Nov", event: "US consumer prices (CPI) for October", place: "Washington", kind: "Economy", source: "BLS", url: "https://www.bls.gov/schedule/2026/11_sched.htm" },
  { date: "10-11 Nov", event: "US-mediated Ukraine-Russia talks", place: "Abu Dhabi", kind: "Politics", source: "Reuters", url: "https://www.reuters.com/5f374b32b07b/world/europe/us-hold-trilateral-talks-with-ukraine-russia-abu-dhabi-next-week-us-official-2026-11-02/" },
  { date: "13 Nov", event: "US producer prices (PPI) for October", place: "Washington", kind: "Economy", source: "BLS", url: "https://www.bls.gov/schedule/2026/11_sched.htm" },
  { date: "18 Nov", event: "Eurostat full euro area inflation data for October", place: "Luxembourg", kind: "Economy", source: "Eurostat", url: "https://ec.europa.eu/eurostat/en/web/products-euro-indicators/w/2-04112026-ap" },
  { date: "18-19 Nov", event: "APEC Economic Leaders' Meeting", place: "Shenzhen, China", kind: "Politics", source: "gov.cn", url: "https://english.www.gov.cn/news/202512/12/content_WS693c1432c6d00ca5f9a080e6.html" },
  { date: "29 Nov", event: "Spain snap general election", place: "Spain", kind: "Politics", source: "La Moncloa", url: "https://www.lamoncloa.gob.es/lang/en/presidente/news/paginas/2026/20261005-institutional-statement.aspx" },
  { date: "4 Dec", event: "US jobs report for November", place: "Washington", kind: "Economy", source: "BLS", url: "https://www.bls.gov/schedule/2026/11_sched.htm" },
  { date: "14-15 Dec", event: "G20 Leaders' Summit", place: "Miami, US", kind: "Politics", source: "G20 Research Group", url: "https://www.g20.utoronto.ca/summits/2026miami.html" },
  { date: "Before 25 Dec", event: "UN-backed talks with Sudan's RSF bloc (expected)", place: "Possibly Addis Ababa", kind: "Politics", source: "The Soufan Center", url: "https://thesoufancenter.org/intelbrief-2026-november-4/" },
];

interface EconItem {
  item: string;
  figure: string;
  detail: string;
  date: string;
  source: string;
  url: string;
}

const ECON: EconItem[] = [
  { item: "US Federal Reserve", figure: "3.75-4.00% (hold)", detail: "10-2 vote; Cook and Hammack wanted a 0.25 point hike. Statement: inflation remains elevated.", date: "28 Oct 2026", source: "Federal Reserve", url: "https://www.federalreserve.gov/newsevents/pressreleases/monetary20261028a.htm" },
  { item: "European Central Bank", figure: "2.50% deposit rate (hold)", detail: "Warned the energy shock is likely to push inflation up and growth down.", date: "29 Oct 2026", source: "ECB", url: "https://www.ecb.europa.eu/press/pr/date/2026/html/ecb.mp261029~9a493adf17.en.html" },
  { item: "Bank of Japan", figure: "1.25% (hold)", detail: "8-1 vote; said underlying inflation is now consistent with its 2% target, a first since 2013.", date: "30 Oct 2026", source: "CNBC", url: "https://www.cnbc.com/2026/10/30/boj-inflation-target-rates.html" },
  { item: "Euro area inflation (flash)", figure: "4.0% in October", detail: "Up from 3.8%. Energy 20.8%; excluding energy, food, alcohol and tobacco 2.5%.", date: "4 Nov 2026", source: "Eurostat", url: "https://ec.europa.eu/eurostat/en/web/products-euro-indicators/w/2-04112026-ap" },
  { item: "Brent crude oil", figure: "$103.60 a barrel", detail: "Down $1.17, near a four-week low, on hopes that talks will end the wars.", date: "3 Nov 2026", source: "Euronext / Dow Jones", url: "https://live.euronext.com/en/financial-news/oil-prices-ease-settle-near-4-week-low-hopes-peace-talks-will-end-wars" },
  { item: "US stocks", figure: "S&P 500 +1.72% early", detail: "Dow +2.3%, Nasdaq +2.13% at 9:46 a.m. ET after the midterms; defence and data centre stocks fell.", date: "4 Nov 2026", source: "Business Standard (Reuters)", url: "https://www.business-standard.com/world-news/wall-street-rallies-after-democrats-win-congress-data-center-stocks-slide-126110402050_1.html" },
  { item: "Japan stocks", figure: "Nikkei 62,188.63 (-1.42%)", detail: "Topix fell 0.89% to 3,895.38.", date: "4 Nov 2026", source: "Kyodo News", url: "https://english.kyodonews.net/articles/-/90209" },
  { item: "US-China trade", figure: "Truce extended to January", detail: "Tariff escalation paused, but chip and critical-mineral controls keep growing.", date: "1 Nov 2026", source: "The Guardian", url: "https://www.theguardian.com/world/2026/nov/01/us-china-trade-war-trump-xi" },
  { item: "Crypto: Binance hack", figure: "About $6.3bn affected", detail: "TRM Labs called it the largest crypto theft on record and linked it to North Korea; no government attribution yet.", date: "1 Nov 2026", source: "Vocemundi", url: "https://vocemundi.com/the-week-2026-11-01/" },
];

const EURO_INFLATION = [
  { label: "May", value: 3.2 },
  { label: "Jun", value: 2.8 },
  { label: "Jul", value: 2.9 },
  { label: "Aug", value: 3.2 },
  { label: "Sep", value: 3.8 },
  { label: "Oct", value: 4.0 },
];

interface Profile {
  code: CountryCode;
  name: string;
  capital: string;
  population: number;
  gdp: number;
  headOfState: string;
  headOfGov: string;
  note?: string;
}

const PROFILES: Profile[] = [
  { code: "US", name: "United States", capital: "Washington, D.C.", population: 341.89, gdp: 30861.3, headOfState: "President Donald Trump", headOfGov: "President Donald Trump (Vice President JD Vance)" },
  { code: "CN", name: "China", capital: "Beijing", population: 1404.89, gdp: 19626.191, headOfState: "President Xi Jinping", headOfGov: "Premier Li Qiang" },
  { code: "RU", name: "Russia", capital: "Moscow", population: 143.997, gdp: 2572.315, headOfState: "President Vladimir Putin", headOfGov: "Prime Minister Mikhail Mishustin" },
  { code: "UA", name: "Ukraine", capital: "Kyiv", population: 32.863, gdp: 214.233, headOfState: "President Volodymyr Zelenskyy", headOfGov: "Prime Minister Serhii Koretskyi (since 16 Jul 2026)" },
  { code: "IL", name: "Israel", capital: "Jerusalem (most embassies are in Tel Aviv)", population: 10.124, gdp: 616.56, headOfState: "President Isaac Herzog", headOfGov: "Prime Minister Benjamin Netanyahu (coalition talks under way)" },
  { code: "IN", name: "India", capital: "New Delhi", population: 1463.866, gdp: 3908.964, headOfState: "President Droupadi Murmu", headOfGov: "Prime Minister Narendra Modi" },
  { code: "JP", name: "Japan", capital: "Tokyo", population: 123.291, gdp: 4453.094, headOfState: "Emperor Naruhito", headOfGov: "Prime Minister Sanae Takaichi" },
  { code: "DE", name: "Germany", capital: "Berlin", population: 83.513, gdp: 5115.594, headOfState: "President Frank-Walter Steinmeier", headOfGov: "Chancellor Friedrich Merz" },
  { code: "GB", name: "United Kingdom", capital: "London", population: 69.487, gdp: 4012.224, headOfState: "King Charles III", headOfGov: "Prime Minister Andy Burnham (since 20 Jul 2026)" },
  { code: "FR", name: "France", capital: "Paris", population: 68.852, gdp: 3382.595, headOfState: "President Emmanuel Macron", headOfGov: "Prime Minister Sebastien Lecornu" },
  { code: "BR", name: "Brazil", capital: "Brasilia", population: 213.421, gdp: 2279.918, headOfState: "President Luiz Inacio Lula da Silva (re-elected 25 Oct 2026)", headOfGov: "President Lula da Silva" },
  { code: "SA", name: "Saudi Arabia", capital: "Riyadh", population: 36.006, gdp: 1273.555, headOfState: "King Salman bin Abdulaziz", headOfGov: "Crown Prince and Prime Minister Mohammed bin Salman" },
  { code: "IR", name: "Iran", capital: "Tehran", population: 87.057, gdp: 371.123, headOfState: "Supreme Leader Mojtaba Khamenei", headOfGov: "President Masoud Pezeshkian", note: "Ali Khamenei was killed in the 28 Feb 2026 US-Israeli strikes." },
  { code: "ID", name: "Indonesia", capital: "Jakarta", population: 284.67, gdp: 1445.642, headOfState: "President Prabowo Subianto", headOfGov: "President Prabowo Subianto" },
  { code: "MY", name: "Malaysia", capital: "Kuala Lumpur (government seat: Putrajaya)", population: 33.852, gdp: 472.731, headOfState: "Sultan Ibrahim, Yang di-Pertuan Agong", headOfGov: "Prime Minister Anwar Ibrahim" },
];

function fmtGdp(b: number): string {
  if (b >= 1000) return "$" + (b / 1000).toFixed(2) + " trillion";
  return "$" + Math.round(b).toString() + " billion";
}
function fmtGdpShort(b: number): string {
  if (b >= 1000) return "$" + (b / 1000).toFixed(1) + "T";
  return "$" + Math.round(b).toString() + "B";
}
function fmtPop(m: number): string {
  if (m >= 1000) return (m / 1000).toFixed(2) + " billion";
  return m.toFixed(1) + " million";
}

type Decade = "All" | "1940s" | "1950s" | "1960s" | "1970s" | "1980s" | "1990s" | "2000s" | "2010s" | "2020s";

interface HistEvent {
  year: number;
  date: string;
  title: string;
  detail: string;
}

const HISTORY: HistEvent[] = [
  { year: 1945, date: "24 Oct 1945", title: "United Nations founded", detail: "The UN Charter enters into force after the Second World War." },
  { year: 1947, date: "1947", title: "Cold War begins; India and Pakistan independent", detail: "The Truman Doctrine sets US containment policy; British India is partitioned." },
  { year: 1948, date: "1948", title: "State of Israel founded; Berlin Blockade", detail: "Israel declares independence and the first Arab-Israeli war follows; the Soviets blockade West Berlin." },
  { year: 1949, date: "1949", title: "NATO formed; People's Republic of China founded", detail: "Mao Zedong proclaims the PRC; the USSR tests its first atomic bomb." },
  { year: 1950, date: "1950-1953", title: "Korean War", detail: "Ends in an armistice that still divides the peninsula." },
  { year: 1955, date: "1955", title: "Warsaw Pact and Bandung Conference", detail: "Soviet bloc alliance formed; Asian and African states meet in Bandung, Indonesia." },
  { year: 1957, date: "1957", title: "Sputnik; Malaya independent; Treaty of Rome", detail: "Space race starts; the European Economic Community is founded." },
  { year: 1960, date: "1960", title: "Year of Africa", detail: "Seventeen African countries gain independence as decolonisation peaks." },
  { year: 1962, date: "Oct 1962", title: "Cuban Missile Crisis", detail: "The closest the superpowers came to nuclear war." },
  { year: 1967, date: "Jun 1967", title: "Six-Day War; ASEAN founded", detail: "Israel takes the West Bank, Gaza, Sinai and Golan Heights; five states found ASEAN." },
  { year: 1973, date: "1973", title: "Yom Kippur War and oil crisis", detail: "Arab oil embargo quadruples oil prices." },
  { year: 1975, date: "1975", title: "Fall of Saigon", detail: "The Vietnam War ends with the country unified under the North." },
  { year: 1979, date: "1979", title: "Iranian Revolution; Soviet invasion of Afghanistan", detail: "The Islamic Republic is founded; China begins market reforms under Deng Xiaoping." },
  { year: 1989, date: "9 Nov 1989", title: "Fall of the Berlin Wall", detail: "Revolutions sweep Eastern Europe; Tiananmen Square crackdown in China." },
  { year: 1990, date: "3 Oct 1990", title: "German reunification", detail: "Iraq invades Kuwait in August; the Gulf War follows in 1991." },
  { year: 1991, date: "26 Dec 1991", title: "Soviet Union dissolves", detail: "Fifteen independent states, including Russia and Ukraine, emerge; the Cold War ends." },
  { year: 1994, date: "1994", title: "End of apartheid; Rwandan genocide", detail: "Nelson Mandela becomes South Africa's president." },
  { year: 1997, date: "1997", title: "Asian financial crisis; Hong Kong handover", detail: "Currency crashes hit Thailand, Indonesia, Malaysia and South Korea." },
  { year: 2001, date: "11 Sep 2001", title: "9/11 attacks", detail: "The US launches the war in Afghanistan; China joins the WTO." },
  { year: 2003, date: "Mar 2003", title: "US-led invasion of Iraq", detail: "Saddam Hussein is overthrown." },
  { year: 2008, date: "Sep 2008", title: "Global financial crisis", detail: "Lehman Brothers collapses; the G20 becomes the main economic forum." },
  { year: 2011, date: "2010-2011", title: "Arab Spring", detail: "Uprisings topple leaders in Tunisia, Egypt and Libya; Syria's civil war begins." },
  { year: 2014, date: "Mar 2014", title: "Russia annexes Crimea", detail: "War starts in eastern Ukraine; ISIS declares a caliphate." },
  { year: 2016, date: "2016", title: "Brexit vote and Trump elected", detail: "The UK votes to leave the EU (exit in 2020)." },
  { year: 2020, date: "Mar 2020", title: "COVID-19 pandemic", detail: "WHO declares a pandemic; the global economy contracts." },
  { year: 2021, date: "Aug 2021", title: "Taliban retake Afghanistan", detail: "US withdrawal completed." },
  { year: 2022, date: "24 Feb 2022", title: "Russia's full-scale invasion of Ukraine", detail: "Largest war in Europe since 1945." },
  { year: 2023, date: "7 Oct 2023", title: "Hamas attack on Israel; Gaza war", detail: "Israel launches a war in Gaza." },
  { year: 2024, date: "Dec 2024", title: "Assad falls in Syria", detail: "Trump wins the US presidential election in November." },
  { year: 2025, date: "Oct 2025", title: "Gaza ceasefire", detail: "A ceasefire begins in Gaza; second-phase talks are still under way in Nov 2026." },
  { year: 2026, date: "28 Feb 2026", title: "US and Israel launch war on Iran", detail: "Supreme Leader Ali Khamenei is killed; the Strait of Hormuz is effectively closed." },
  { year: 2026, date: "Jun 2026", title: "US-Iran memorandum briefly pauses the war", detail: "It collapses within weeks after renewed attacks on shipping." },
  { year: 2026, date: "Jul 2026", title: "New leaders in Ukraine and the UK", detail: "Serhii Koretskyi becomes Ukraine's PM (16 Jul); Andy Burnham becomes UK PM (20 Jul)." },
  { year: 2026, date: "25-27 Oct 2026", title: "Lula re-elected; Israel's election ends in deadlock", detail: "Neither Israeli bloc reaches 61 seats." },
  { year: 2026, date: "3 Nov 2026", title: "Democrats win both houses of the US Congress", detail: "A rebuke of Trump halfway through his second term." },
];

const HISTORY_SOURCES: Record<number, { label: string; url: string }> = {
  2025: { label: "Ilke News Agency", url: "https://ilkha.com/english/world/hamas-delegation-arrives-in-cairo-for-new-round-of-gaza-ceasefire-talks-550914" },
};

const out = {
  title: "Global Intelligence Monitor",
  snapshot: "Wednesday 4 November 2026 (Europe/Rome)",
  snapshotDate: "2026-11-04",
  lastUpdated: "2026-11-05T18:00:00+01:00",
  summary: "A one-page briefing on world news, conflicts, politics and the economy in the week to 4 November 2026, with country profiles and a timeline since 1945.",
  news: NEWS, conflicts: CONFLICTS, politics: POLITICS, upcoming: UPCOMING, economy: ECON,
  economyNote: "The Bank of England decides on 5 November; see the upcoming events table. Energy is the main driver of higher inflation in Europe while the Iran war keeps Hormuz shipping disrupted.",
  policyRates: [
    { label: "US Fed", value: 4.0, display: "3.75-4.00%" },
    { label: "ECB deposit", value: 2.5, display: "2.50%" },
    { label: "Bank of Japan", value: 1.25, display: "1.25%" },
  ],
  euroInflation: EURO_INFLATION,
  profiles: PROFILES,
  profilesNote: "Population and GDP are IMF World Economic Outlook estimates for 2025 (GDP in current US dollars). Leaders checked against news of 1-4 November 2026.",
  profileSource: "https://www.imf.org/external/datamapper/NGDPD@WEO",
  history: HISTORY.map((h) => ({ ...h, url: HISTORY_SOURCES[h.year]?.url ?? null, source: HISTORY_SOURCES[h.year]?.label ?? null })),
  sources: [
    { title: "IMF World Economic Outlook: GDP", site: "imf.org", url: "https://www.imf.org/external/datamapper/NGDPD@WEO" },
    { title: "IMF World Economic Outlook: population", site: "imf.org", url: "https://www.imf.org/external/datamapper/LP@WEO" },
    { title: "UK Prime Minister: Andy Burnham", site: "gov.uk", url: "https://www.gov.uk/government/ministers/prime-minister" },
    { title: "Who determines Iran's position (Mojtaba Khamenei, 28 Feb strikes)", site: "aljazeera.com", date: "4 Nov 2026", url: "https://www.aljazeera.com/news/2026/11/4/who-determines-irans-fighting-and-negotiating-position-amid-us-threats" },
    { title: "Rada appoints Serhii Koretskyi PM", site: "reuters.com", date: "16 Jul 2026", url: "https://www.reuters.com/world/ukraine-parliament-approves-energy-executive-koretskyi-new-pm-2026-07-16/" },
    { title: "French government: Sebastien Lecornu", site: "info.gouv.fr", url: "https://www.info.gouv.fr/personnalite/sebastien-lecornu" },
  ],
};
import { writeFileSync } from "node:fs";
writeFileSync("../data.json", JSON.stringify(out, null, 2));
console.log("ok", out.news.length, out.conflicts.length, out.politics.length, out.upcoming.length, out.economy.length, out.profiles.length, out.history.length);
