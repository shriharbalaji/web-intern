# Task 2: UI/UX Wireframing & Design — TaskFlow Pro

## Layout Plan

### Login Page
```
--------------------------------
|        TaskFlow Pro          |
--------------------------------
| Email                       |
| Password                    |
| Login Button                |
| Register Link               |
--------------------------------

```

### Register Page
```
--------------------------------
|      Create Account          |
--------------------------------
| Full Name                   |
| Email                       |
| Password                    |
| Confirm Password            |
| Register Button             |
| Login Link                  |
--------------------------------

```

## Design Decisions
- **Buttons**: Rounded corners (8px radius), primary color for "Add Task" button
- **Navigation/Filters**: Pill-style tabs (All / Active / Completed) — active tab highlighted
- **Sections**: Header → Input bar → Filter tabs → Task list → Footer summary
- **Color Palette**: Dark background (#1a1a2e), pink/purple accent (#e94560), white text
- **Typography**: Clean sans-serif (system-ui / Segoe UI), bold headings
- **Task rows**: Checkbox (left) → task title (middle) → priority tag + delete icon (right)
- **Completed tasks**: strikethrough text + faded opacity

## Tools Used
- Wireframes sketched using Figma-style block layout described above (text-based, no proprietary file needed)
- Balsamiq-style low-fidelity approach: boxes and labels, no color polish yet — color/spacing finalized during frontend build (Task 3)
