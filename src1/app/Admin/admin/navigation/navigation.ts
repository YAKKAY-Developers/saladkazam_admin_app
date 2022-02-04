import { Injectable } from "@angular/core";

export interface NavigationItem {
  id: string;
  title: string;
  type: "item" | "collapse" | "group";
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

// const NavigationItems = [
//   {
//     id: "navigation",
//     title: "Navigation",
//     type: "group",
//     icon: "feather icon-monitor",
//     children: [
//       {
//         id: "dashboard",
//         title: "Dashboard",
//         type: "item",
//         url: "/dashboard/analytics",
//         icon: "feather icon-home",
//       },
//       {
//         id: "page-layouts",
//         title: "Horizontal Layouts",
//         type: "item",
//         url: "/layout/horizontal",
//        
//         icon: "feather icon-layout",
//       },
//     ],
//   },
//   {
//     id: "ui-element",
//     title: "Settings",
//     type: "group",
//     icon: "feather icon-layers",
//     children: [
//       {
//         id: "settings",
//         title: "Configaration",
//         type: "collapse",
//         icon: "feather icon-box",
//         children: [
//           {
//             id: "breadcrumb-pagination",
//             title: "Banner",
//             type: "item",
//             url: "/settings/banner",
//           },
//           {
//             id: "breadcrumb-pagination",
//             title: "Product import",
//             type: "item",
//             url: "/basic/breadcrumb-paging",
//           },
//           {
//             id: "breadcrumb-pagination",
//             title: "Reviews",
//             type: "item",
//             url: "/basic/breadcrumb-paging",
//           },
//           {
//             id: "badges",
//             title: "User Rights",
//             type: "item",
//             url: "/basic/badges",
//           },
//           {
//             id: "alert",
//             title: "Keywords",
//             type: "item",
//             url: "/basic/alert",
//           },
//           {
//             id: "button",
//             title: "Users",
//             type: "item",
//             url: "/admin/color",
//           },

//           {
//             id: "cards",
//             title: "Product Details",
//             type: "item",
//             url: "/settings/productdetails",
//           },
//         ],
//       },
//       {
//         id: "forms-element",
//         title: "Settings",
//         type: "item",
//         url: "/forms/basic",
//         icon: "feather icon-file-text",
//       },
//     ],
//   },

//   {
//     id: "table",
//     title: "Admin",
//     type: "group",
//     icon: "feather icon-list",
//     children: [
//       {
//         id: "bootstrap",
//         title: "Tax",
//         type: "item",
//         url: "/tbl-bootstrap/bt-basic",
//         icon: "feather icon-server",
//        
//        
//       },
//       {
//         id: "apex",
//         title: "Catergory",
//         type: "item",
//         url: "/admin/catergory",
//         icon: "feather icon-pie-chart",
//        
//        
//       },
//       {
//         id: "apex1",
//         title: "Colour",
//         type: "item",
//         url: "/admin/color",
//         icon: "feather icon-pie-chart",
//        
//        
//       },
//       {
//         id: "apex2",
//         title: "Size",
//         type: "item",
//         url: "/charts/apex",
//         icon: "feather icon-pie-chart",
//        
//        
//       },
//       {
//         id: "apex3",
//         title: "Coupon Code",
//         type: "item",
//         url: "/charts/apex",
//         icon: "feather icon-pie-chart",
//        
//        
//       },
//     ],
//   },
//   {
//     id: "pages",
//     title: "Master",
//     type: "group",
//     icon: "feather icon-file-text",
//     children: [
//       {
//         id: "auth",
//         title: "Product",
//         type: "collapse",
//         icon: "feather icon-lock",
//         children: [
//           {
//             id: "signup",
//             title: "Product Group",
//             type: "item",
//             url: "/auth/signup",
//            
//            
//           },
//           {
//             id: "signin",
//             title: "Product",
//             type: "item",
//             url: "/auth/signin",
//            
//            
//           },
//           {
//             id: "reset-password",
//             title: "Product API",
//             type: "item",
//             url: "/auth/reset-password",
//            
//            
//           },
//           {
//             id: "change-password",
//             title: "Product Rate",
//             type: "item",
//             url: "/auth/change-password",
//            
//            
//           },
//         ],
//       },
//       {
//         id: "maintenance",
//         title: "Customer",
//         type: "collapse",
//         icon: "feather icon-sliders",
//         children: [
//           {
//             id: "error",
//             title: "Manage Customer",
//             type: "item",
//             url: "/maintenance/error",
//            
//            
//           },
//           {
//             id: "coming-soon",
//             title: "Priviledge",
//             type: "item",
//             url: "/maintenance/coming-soon",
//            
//            
//           },
//           {
//             id: "coming-soon",
//             title: "Query and Send Mail",
//             type: "item",
//             url: "/maintenance/coming-soon",
//            
//            
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "other",
//     title: "Reports",
//     type: "group",
//     icon: "feather icon-align-left",
//     children: [
//       {
//         id: "menu-level",
//         title: "Admin",
//         type: "collapse",
//         icon: "feather icon-menu",
//         children: [
//           {
//             id: "menu-level-2.1",
//             title: "Order list",
//             type: "item",
//             url: "javascript:",
//             external: true,
//           },
//           {
//             id: "menu-level-2.1",
//             title: "Order Hstory",
//             type: "item",
//             url: "javascript:",
//             external: true,
//           },
//           {
//             id: "menu-level-2.1",
//             title: "Update Order Status",
//             type: "item",
//             url: "javascript:",
//             external: true,
//           },
//           {
//             id: "menu-level-2.2",
//             title: "Sales",
//             type: "collapse",
//             children: [
//               {
//                 id: "menu-level-2.2.1",
//                 title: "Sales Order",
//                 type: "item",
//                 url: "javascript:",
//                 external: true,
//               },
//               {
//                 id: "menu-level-2.2.2",
//                 title: "Order Status",
//                 type: "item",
//                 url: "javascript:",
//                 external: true,
//               },
//               {
//                 id: "menu-level-2.2.2",
//                 title: "Order Status",
//                 type: "item",
//                 url: "javascript:",
//                 external: true,
//               },
//               {
//                 id: "menu-level-2.2.2",
//                 title: "Invoice",
//                 type: "item",
//                 url: "javascript:",
//                 external: true,
//               },
//               {
//                 id: "menu-level-2.2.2",
//                 title: "Payments",
//                 type: "item",
//                 url: "javascript:",
//                 external: true,
//               },
//               {
//                 id: "menu-level-2.2.2",
//                 title: "Customer List",
//                 type: "item",
//                 url: "javascript:",
//                 external: true,
//               },
//               {
//                 id: "menu-level-2.2.2",
//                 title: "Product Analitics",
//                 type: "item",
//                 url: "javascript:",
//                 external: true,
//               },
//               {
//                 id: "menu-level-2.2.2",
//                 title: "Cancel Order",
//                 type: "item",
//                 url: "javascript:",
//                 external: true,
//               },

//               {
//                 id: "menu-level-2.2.2",
//                 title: "Sales Return",
//                 type: "item",
//                 url: "javascript:",
//                 external: true,
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: "disabled-menu",
//         title: "Disabled Menu",
//         type: "item",
//         url: "javascript:",
//         classes: "nav-item disabled",
//         icon: "feather icon-power",
//         external: true,
//       },
//       {
//         id: "sample-page",
//         title: "Sample Page",
//         type: "item",
//         url: "/sample-page",
//         classes: "nav-item",
//         icon: "feather icon-sidebar",
//       },
//     ],
//   },
// ];
const NavigationItems = [
  {
    id: "navigation",
    title: "Navigation",
    type: "group",
    icon: "feather icon-monitor",
    children: [
      {
        id: "dashboard",
        title: "Dashboard",
        type: "item",
        url: "/dashboard/analytics",
        icon: "feather icon-home",
      },
      {
        id: "page-layouts",
        title: "Horizontal Layouts",
        type: "item",
        url: "/layout/horizontal",
       
        icon: "feather icon-layout",
      },
    ],
  },
  {
    id: "ui-element",
    title: "Settings",
    type: "group",
    icon: "feather icon-layers",
    children: [
      {
        id: "settings",
        title: "Configaration",
        type: "collapse",
        icon: "feather icon-box",
        children: [
          {
            id: "breadcrumb-pagination",
            title: "Banner",
            type: "item",
            url: "/settings/banner",
          },
          {
            id: "breadcrumb-pagination",
            title: "Product import",
            type: "item",
            url: "/basic/breadcrumb-paging",
          },
          {
            id: "breadcrumb-pagination",
            title: "Reviews",
            type: "item",
            url: "/basic/breadcrumb-paging",
          },
          {
            id: "badges",
            title: "User Rights",
            type: "item",
            url: "/basic/badges",
          },
          {
            id: "alert",
            title: "Keywords",
            type: "item",
            url: "/basic/alert",
          },
          {
            id: "button",
            title: "Users",
            type: "item",
            url: "/admin/color",
          },

          {
            id: "cards",
            title: "Product Details",
            type: "item",
            url: "/settings/productdetails",
          },
        ],
      },
      {
        id: "forms-element",
        title: "Settings",
        type: "item",
        url: "/forms/basic",
        icon: "feather icon-file-text",
      },
    ],
  },

  {
    id: "table",
    title: "Admin",
    type: "group",
    icon: "feather icon-list",
    children: [
      {
        id: "bootstrap",
        title: "Tax",
        type: "item",
        url: "/tbl-bootstrap/bt-basic",
        icon: "feather icon-server"
      },
      {
        id: "apex",
        title: "Catergory",
        type: "item",
        url: "/admin/catergory",
        icon: "feather icon-pie-chart"
      },
      {
        id: "apex1",
        title: "Colour",
        type: "item",
        url: "/admin/color",
        icon: "feather icon-pie-chart"
      },
      {
        id: "apex2",
        title: "Size",
        type: "item",
        url: "/charts/apex",
        icon: "feather icon-pie-chart",
       
       
      },
      {
        id: "apex3",
        title: "Coupon Code",
        type: "item",
        url: "/charts/apex",
        icon: "feather icon-pie-chart",
       
       
      },
    ],
  },
  {
    id: "pages",
    title: "Master",
    type: "group",
    icon: "feather icon-file-text",
    children: [
      {
        id: "auth",
        title: "Product",
        type: "collapse",
        icon: "feather icon-lock",
        children: [
          {
            id: "signup",
            title: "Product Group",
            type: "item",
            url: "/master/product/productgroup",
           
           
          },
          {
            id: "signin",
            title: "Product",
            type: "item",
            url: "/master/product/products",
           
           
          },
          {
            id: "reset-password",
            title: "Product API",
            type: "item",
            url: "/auth/reset-password",
           
           
          },
          {
            id: "change-password",
            title: "Product Rate",
            type: "item",
            url: "/master/product/productrate",
           
           
          },
        ],
      },
      {
        id: "maintenance",
        title: "Customer",
        type: "collapse",
        icon: "feather icon-sliders",
        children: [
          {
            id: "error",
            title: "Manage Customer",
            type: "item",
            url: "/maintenance/error",
           
           
          },
          {
            id: "coming-soon",
            title: "Priviledge",
            type: "item",
            url: "/maintenance/coming-soon",
           
           
          },
          {
            id: "coming-soon",
            title: "Query and Send Mail",
            type: "item",
            url: "/maintenance/coming-soon",
           
           
          },
        ],
      },
    ],
  },
  {
    id: "other",
    title: "Reports",
    type: "group",
    icon: "feather icon-align-left",
    children: [
      {
        id: "menu-level",
        title: "Admin",
        type: "collapse",
        icon: "feather icon-menu",
        children: [
          {
            id: "menu-level-2.1",
            title: "Order list",
            type: "item",
            url: "javascript:",
            external: true,
          },
          {
            id: "menu-level-2.1",
            title: "Order Hstory",
            type: "item",
            url: "javascript:",
            external: true,
          },
          {
            id: "menu-level-2.1",
            title: "Update Order Status",
            type: "item",
            url: "javascript:",
            external: true,
          },
          {
            id: "menu-level-2.2",
            title: "Sales",
            type: "collapse",
            children: [
              {
                id: "menu-level-2.2.1",
                title: "Sales Order",
                type: "item",
                url: "javascript:",
                external: true,
              },
              {
                id: "menu-level-2.2.2",
                title: "Order Status",
                type: "item",
                url: "javascript:",
                external: true,
              },
              {
                id: "menu-level-2.2.2",
                title: "Order Status",
                type: "item",
                url: "javascript:",
                external: true,
              },
              {
                id: "menu-level-2.2.2",
                title: "Invoice",
                type: "item",
                url: "javascript:",
                external: true,
              },
              {
                id: "menu-level-2.2.2",
                title: "Payments",
                type: "item",
                url: "javascript:",
                external: true,
              },
              {
                id: "menu-level-2.2.2",
                title: "Customer List",
                type: "item",
                url: "javascript:",
                external: true,
              },
              {
                id: "menu-level-2.2.2",
                title: "Product Analitics",
                type: "item",
                url: "javascript:",
                external: true,
              },
              {
                id: "menu-level-2.2.2",
                title: "Cancel Order",
                type: "item",
                url: "javascript:",
                external: true,
              },

              {
                id: "menu-level-2.2.2",
                title: "Sales Return",
                type: "item",
                url: "javascript:",
                external: true,
              },
            ],
          },
        ],
      },
      
    ],
  },
];
@Injectable()
export class NavigationItem {
  public get() {
    return NavigationItems;
  }
}
