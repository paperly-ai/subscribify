export interface NavigationItem {
  id: string;
  title: string;
  url: string;
  onlyMobile?: boolean; // optional property
}

export const navigation: NavigationItem[] = [
  {
    id: "0",
    title: "Features",
    url: "#features",
  },
  {
    id: "1",
    title: "Pricing",
    url: "/#pricing",
  },
  {
    id: "2",
    title: "Integration",
    url: "#how-to-use",
  },
  {
    id: "3",
    title: "Documentation",
    url: "https://lokesh-3.gitbook.io/paperly-ai",
  },
  {
    id: "4",
    title: "New account",
    url: "#signup",
    onlyMobile: true,
  },
  {
    id: "5",
    title: "Sign in",
    url: "#login",
    onlyMobile: true,
  },
];
