// app/secure/page.tsx
"use client";

import { useEffect } from "react";

export default function SecurePage() {
  useEffect(() => {
    let focusInterval: NodeJS.Timeout;

    // Handle ALL keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent ALL modifier key combinations
      if (
        e.ctrlKey || // Windows/Linux Control key
        e.altKey || // Windows/Linux Alt key
        e.metaKey || // Mac Command key
        e.key === "F11" || // Fullscreen
        e.key === "Escape" || // Escape key
        e.key === "Tab" || // Tab key
        e.key === "Meta" || // Windows/Command key
        e.key === " " || // Space key
        e.key === "PrintScreen" || // Print screen
        e.shiftKey || // Shift key combinations
        e.key === "OS" // Windows/Command key
      ) {
        e.preventDefault();
        e.stopPropagation();
        window.focus();
        return false;
      }

      // Prevent function keys
      if (e.key.match(/F\d/)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Prevent Mac-specific shortcuts
      if (
        e.key === "h" || // Hide window (Cmd + H)
        e.key === "m" || // Minimize window (Cmd + M)
        e.key === "q" || // Quit (Cmd + Q)
        e.key === "w" || // Close window/tab (Cmd + W)
        e.key === "n" || // New window (Cmd + N)
        e.key === "t" || // New tab (Cmd + T)
        e.key === "`" || // Switch windows (Cmd + `)
        e.key === "l" || // Address bar (Cmd + L)
        e.key === "[" || // Back (Cmd + [)
        e.key === "]" // Forward (Cmd + ])
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Enhanced visibility handling for both platforms
    const handleVisibility = () => {
      if (document.hidden) {
        window.focus();
        // Force focus back to window
        const focusBack = () => {
          window.focus();
          try {
            // Try different fullscreen methods
            if (document.documentElement.requestFullscreen) {
              document.documentElement.requestFullscreen();
            } else if (
              (document.documentElement as any).webkitRequestFullscreen
            ) {
              (document.documentElement as any).webkitRequestFullscreen();
            }
          } catch (error) {
            console.error("Fullscreen request failed:", error);
          }
        };
        focusBack();
      }
    };

    // Enhanced mouse leave handler
    const handleMouseLeave = (e: MouseEvent) => {
      e.preventDefault();
      window.focus();
    };

    // Prevent context menu (right-click)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Handle browser navigation
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
      window.focus();
    };

    // Handle page close/reload
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
      return "";
    };

    // More aggressive focus check
    focusInterval = setInterval(() => {
      if (!document.hasFocus()) {
        window.focus();
        try {
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
          }
        } catch (error) {
          console.error("Fullscreen request failed:", error);
        }
      }
    }, 100);

    // Disable selection
    document.onselectstart = () => false;
    // Disable right-click
    document.oncontextmenu = () => false;
    // Disable drag
    document.ondragstart = () => false;

    // Set up event listeners with capture and passive: false
    const listenerOptions = { capture: true, passive: false };

    document.addEventListener("keydown", handleKeyDown, listenerOptions);
    document.addEventListener(
      "visibilitychange",
      handleVisibility,
      listenerOptions
    );
    document.addEventListener("mouseleave", handleMouseLeave, listenerOptions);
    document.addEventListener(
      "contextmenu",
      handleContextMenu,
      listenerOptions
    );
    window.addEventListener("popstate", handlePopState, listenerOptions);
    window.addEventListener(
      "beforeunload",
      handleBeforeUnload,
      listenerOptions
    );

    // Additional Mac-specific events
    document.addEventListener(
      "webkitvisibilitychange",
      handleVisibility,
      listenerOptions
    );
    document.addEventListener(
      "gesturestart",
      (e) => e.preventDefault(),
      listenerOptions
    );
    document.addEventListener(
      "gesturechange",
      (e) => e.preventDefault(),
      listenerOptions
    );
    document.addEventListener(
      "gestureend",
      (e) => e.preventDefault(),
      listenerOptions
    );

    // Push initial state to prevent going back
    window.history.pushState(null, "", window.location.href);

    // Request fullscreen on load
    const requestFullScreen = () => {
      try {
        const element = document.documentElement;
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if ((element as any).webkitRequestFullscreen) {
          (element as any).webkitRequestFullscreen();
        }
      } catch (error) {
        console.error("Fullscreen request failed:", error);
      }
    };
    requestFullScreen();

    // Cleanup function
    return () => {
      if (focusInterval) clearInterval(focusInterval);

      document.removeEventListener("keydown", handleKeyDown, listenerOptions);
      document.removeEventListener(
        "visibilitychange",
        handleVisibility,
        listenerOptions
      );
      document.removeEventListener(
        "mouseleave",
        handleMouseLeave,
        listenerOptions
      );
      document.removeEventListener(
        "contextmenu",
        handleContextMenu,
        listenerOptions
      );
      window.removeEventListener("popstate", handlePopState, listenerOptions);
      window.removeEventListener(
        "beforeunload",
        handleBeforeUnload,
        listenerOptions
      );

      document.removeEventListener(
        "webkitvisibilitychange",
        handleVisibility,
        listenerOptions
      );
      document.removeEventListener(
        "gesturestart",
        (e) => e.preventDefault(),
        listenerOptions
      );
      document.removeEventListener(
        "gesturechange",
        (e) => e.preventDefault(),
        listenerOptions
      );
      document.removeEventListener(
        "gestureend",
        (e) => e.preventDefault(),
        listenerOptions
      );

      // Exit fullscreen if needed
      try {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else if ((document as any).webkitFullscreenElement) {
          (document as any).webkitExitFullscreen();
        }
      } catch (error) {
        console.error("Exiting fullscreen failed:", error);
      }
    };
  }, []);

  return (
    <main className="p-4 select-none" onContextMenu={(e) => e.preventDefault()}>
      <h1 className="text-2xl font-bold mb-4">Secure Page</h1>
      <p>Browser navigation is disabled on this page</p>

      {/* Your page content goes here */}
    </main>
  );
}
