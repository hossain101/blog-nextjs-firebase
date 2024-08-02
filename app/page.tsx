import UserPostListView from "@/components/Posts/UserPostListView";


export default function Home() {
  return (
  <main>
    <h1>
      
      HOZENX BLOG
    </h1>
    <p>
      Welcome to the Hozenx Blog. Here you will find the latest news, tips, and tricks for all things tech.
    </p>
    <UserPostListView />
  </main>
  );
}
