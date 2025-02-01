<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import Home from "./routes/Home.svelte";
  import Category from "./routes/Category.svelte";
  import Resource from "./routes/Resource.svelte";
  import ChatBot from "./components/ChatBot.svelte";
  
  export let url = "";
</script>

<Router {url}>
  <nav class="header">
    <Link to="/">
      <div class="logo">
        <span>Helpful Information</span>
      </div>
    </Link>
  </nav>

  <main>
    <Route path="/" component={Home} />
    <Route path="/category/:id" component={Category} />
    <Route path="/category/:id/:subId" component={Category} />
    <Route path="/resource/:categoryId/:id" component={Resource} />
  </main>

  <ChatBot />
</Router>

<style>
  :global(body) {
    margin: 0;
    font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
    background-color: #f9f7f4;
  }

  .header {
    background-color: #fff;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: #e31837;
  }

  main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  :global(a) {
    text-decoration: none;
    color: inherit;
  }
</style>