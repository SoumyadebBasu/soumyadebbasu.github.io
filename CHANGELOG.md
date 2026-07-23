# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Implemented a universal reactive border outline glow effect for all interactive elements, including buttons, CTAs, service cards, contact cards, and gallery images.
- Added "General Query" as an option in the Service Type dropdown on the Contact Form.
- Added keyboard accessibility to image modals in service pages (Escape to close, Left/Right arrow keys to navigate between images).
- Enabled the interactive border glow effect for the mobile menu navigation links.

### Changed
- Replaced the global mouse-following glow blob with the targeted reactive outline for improved performance and a cleaner user experience.
- Renamed the "Job Description" field to "Requirement" in the Contact Form.
- Restructured the Contact section glow logic so only specific components (Contact Info cards, Map container, Get a Quote box) interact with the mouse, rather than the entire left or right columns.
- Increased the height of the Contact form text area to better utilize available empty space.
- Shrunk the modal side-scroll navigation buttons in mobile view to prevent them from taking up too much screen space.

### Fixed
- Fixed mobile alignment issue for the "Meet Adbeyond Communications" image in the Non-Profit section by restructuring CSS grid behavior.
- Disabled the default blue browser tap-highlight color (`-webkit-tap-highlight-color: transparent`) on mobile browsers so clicks only trigger the custom red glow animation without interference.
- Ensured the `:focus-visible` outline for keyboard navigation aligns with the brand's primary color.
