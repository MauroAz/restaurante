// // Displays a single company logo with grayscale + hover effect
// export default function CompanyLogo({ name, logo }) {
//   return (
//     // Fixed size container — forces all logos into the same box
//     // regardless of their original dimensions
//     <div className="w-32 h-16 flex items-center justify-center">
//       <img
//         src={logo}
//         alt={name}
//         // fill the container without distortion
//         className="max-w-full max-h-full object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition"
//       />
//     </div>
//   );
// }
// logo: image path string e.g. '/images/amazon.png'
// idx: the array index — used for alt text since we have no name field
export default function CompanyLogo({ logo, idx }) {
  return (
    // h-12 gives every logo container the same fixed height
    // transition prepares for the hover grayscale effect below
    <div className="h-12 transition">
      <img
        src={logo}
        alt={`Company logo ${idx}`}
        // h-full — fills the fixed-height container
        // object-contain — scales without cropping or distorting
        // grayscale by default, removed on hover for colour reveal
        // dark:invert — flips dark logos to white in dark mode
        className="h-full object-contain transition grayscale hover:grayscale-0 dark:invert"
      />
    </div>
  );
}
