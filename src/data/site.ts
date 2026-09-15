export const site = {
  name: "ETX Surf Co",
  shortName: "ETX",
  tagline: "New & Used Boats, Service, and Parts",
  headline: "Find the boat that's the right fit.",
  city: "Whitehouse, TX",
  region: "near Jacksonville, Longview, Dallas, and Fort Worth",
  addressLine: "317 State Highway 110 S",
  cityStateZip: "Whitehouse, TX 75791",
  fullAddress: "317 State Highway 110 S, Whitehouse, TX 75791",
  phone: "903-471-3240",
  phoneDisplay: "(903) 471-3240",
  brendaCell: "903-372-3420",
  emails: ["Aariz@marineworldoftexas.com", "brenda@marineworldoftexas.com"],
  mapEmbed:
    "https://maps.google.com/maps?q=317%20State%20Highway%20110%20S%20Whitehouse%20TX%2075791&t=&z=14&ie=UTF8&iwloc=&output=embed",
  mapDirections:
    "https://www.google.com/maps/dir/?api=1&destination=317+State+Highway+110+S,+Whitehouse,+TX+75791",
  social: {
    facebook: "https://www.facebook.com/Marineworldoftexas",
    instagram: "https://www.instagram.com/marineworldoftexas/",
    tiktok: "https://www.tiktok.com/@marineworldoftexas",
  },
  hours: [
    { day: "Monday", open: "09:00", close: "18:00", label: "9:00 AM – 6:00 PM" },
    { day: "Tuesday", open: "09:00", close: "18:00", label: "9:00 AM – 6:00 PM" },
    { day: "Wednesday", open: "09:00", close: "18:00", label: "9:00 AM – 6:00 PM" },
    { day: "Thursday", open: "09:00", close: "18:00", label: "9:00 AM – 6:00 PM" },
    { day: "Friday", open: "09:00", close: "18:00", label: "9:00 AM – 6:00 PM" },
    { day: "Saturday", open: "09:00", close: "15:00", label: "9:00 AM – 3:00 PM" },
    { day: "Sunday", open: null, close: null, label: "Closed" },
  ] as const,
  welcome: `We strive to do all we can to get you the boat that you're looking for. As your trusted New and pre-owned boat dealership in your area, we pride ourselves on being a cut above the rest with our unrelenting commitment to customer service. With many boat shopping options available, we differentiate ourselves by understanding our local boat-buying community and satisfying its needs; helping valued local customers like you, find the boat that's the "right fit". Our sales team can help you get acquainted with our wide range of inventory, and help you narrow down your choices to find your perfect RIDE!

To learn more about our dealership and how we can help with your next boat purchase, please call or stop by in person. We look forward to meeting you.`,
  about: `ETX Surf Co is an authorized boat dealership serving the Whitehouse area. We are proud to carry a large selection of new and pre-owned inventory. When you are ready to invest in a new boat, our friendly and knowledgeable sales, financing, service, and parts departments are prepared to make sure your experience is outstanding, from assisting while you're making your choice to ongoing maintenance and customization. At ETX Surf Co, we value the opportunity to create a long-term relationship with our customers, and we do that by giving you the best customer service available.

Our goal is for you to be so delighted with your boat purchase that you'll come see us when you need your next boat and will happily recommend us to friends and family. Customer referrals are the ultimate compliment. With many boat shopping options available, we differentiate ourselves by understanding our local boat-buying community and satisfying its needs; helping valued local customers like you, find the vehicle that's the "right fit".

Feel free to browse our inventory online and check out the Featured boats section on our homepage. If you see a vehicle you like, submit an online quote request, or contact us to schedule a test drive.

To learn more about our dealership and how we can help with your next boat purchase, please call or stop by in person. We look forward to meeting you.`,
  brands: [
    "Malibu",
    "Axis Wake Research",
    "Supra",
    "Thor Boats",
    "Sanger",
    "Regal",
    "Glastron",
    "Crownline",
  ],
};

export function isOpenNow(now = new Date()): { open: boolean; label: string } {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = site.hours.find((h) => h.day === days[now.getDay()]);
  if (!today || !today.open || !today.close) {
    return { open: false, label: "Closed today" };
  }
  const [oh, om] = today.open.split(":").map(Number);
  const [ch, cm] = today.close.split(":").map(Number);
  const mins = now.getHours() * 60 + now.getMinutes();
  const openMins = oh * 60 + om;
  const closeMins = ch * 60 + cm;
  if (mins >= openMins && mins < closeMins) {
    return { open: true, label: `Open · until ${today.label.split("–")[1]?.trim()}` };
  }
  if (mins < openMins) return { open: false, label: `Opens at ${today.label.split("–")[0]?.trim()}` };
  return { open: false, label: "Closed for today" };
}
