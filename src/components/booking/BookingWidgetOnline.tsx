"use client";

import { useEffect } from 'react';

interface BookingWidgetOnlineProps {
  serviceId: string;
}

declare global {
  interface Window {
    SimplybookWidget: new (config: Record<string, unknown>) => void;
  }
}

export default function BookingWidgetOnline({ serviceId }: BookingWidgetOnlineProps) {
  useEffect(() => {
    if (!serviceId) return;

    // Clean up any existing widgets
    const existingIframes = document.querySelectorAll('iframe[src*="simplybook"]');
    existingIframes.forEach(iframe => iframe.remove());

    // Load the script
    const script = document.createElement('script');
    script.src = "//widget.simplybook.me/v2/widget/widget.js";
    script.type = "text/javascript";
    script.async = true;
    
    script.onload = () => {
      if (window.SimplybookWidget) {
        new window.SimplybookWidget({
          "widget_type": "iframe",
          "url": "https://mahagurucenter.simplybook.me",
          "theme": "air",
          "theme_settings": {
            "timeline_hide_unavailable": "1",
            "hide_past_days": "0",
            "timeline_show_end_time": "0",
            "timeline_modern_display": "as_table",
            "sb_base_color": "#7b8a78",
            "display_item_mode": "block",
            "booking_nav_bg_color": "#7b8a78",
            "body_bg_color": "#ffffff",
            "sb_review_image": "10",
            "sb_review_image_preview": "/uploads/mahagurucenter/image_files/preview/5db441bc73f5fa2ba07d6d767a63ace8.png",
            "dark_font_color": "#474747",
            "light_font_color": "#ffffff",
            "btn_color_1": "#b0c3ac",
            "sb_company_label_color": "#485146",
            "hide_img_mode": "0",
            "show_sidebar": "1",
            "sb_busy": "#c7b3b3",
            "sb_available": "#d6ebff"
          },
          "timeline": "modern",
          "datepicker": "top_calendar",
          "is_rtl": false,
          "app_config": {
            "clear_session": 0,
            "allow_switch_to_ada": 0,
            "predefined": {
              "provider": "2",
              "service": serviceId,
              "category": "1"
            }
          }
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount
      const scripts = document.querySelectorAll('script[src*="simplybook"]');
      scripts.forEach(s => s.remove());
      const iframes = document.querySelectorAll('iframe[src*="simplybook"]');
      iframes.forEach(iframe => iframe.remove());
    };
  }, [serviceId]);

  return null;
}