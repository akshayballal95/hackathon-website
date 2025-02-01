<script lang="ts">
  import { resources, categories } from '../lib/data';
  import { Link } from "svelte-routing";
  import { writable } from 'svelte/store';
  import { sanityClient } from '../sanityClient';
  import imageUrlBuilder from '@sanity/image-url';
  import { onMount } from 'svelte';
  import { marked } from 'marked';

  // Initialize the image URL builder
  const builder = imageUrlBuilder(sanityClient);
  
  // Function to generate image URL
  function urlFor(source: any) {
    return builder.image(source);
  }

  export let id: string;
  export let subId: string | undefined = undefined;
  
  $: categoryResources = resources.filter(resource => {
    if (subId) {
      return resource._type === subId;
    }
    return resource._type === id;
  });   

  $: if (id === 'shelter') {
    console.log(resources.filter(resource => resource._type === 'shelter'));
    categoryResources = resources.filter(resource => resource._type === 'shelter' && resource.shelterType === subId);
  }

  const openSections = writable<Record<string, boolean>>({});

  function toggleSection(resourceId: string, section: string) {
    openSections.update(sections => ({
      ...sections,
      [`${resourceId}-${section}`]: !sections[`${resourceId}-${section}`]
    }));
  }

  function isOpen(resourceId: string, section: string): boolean {
    let isOpenValue = false;
    openSections.subscribe(sections => {
      isOpenValue = !!sections[`${resourceId}-${section}`];
    })();
    return isOpenValue;
  }

  // Add this helper function
  function getCategory(categoryId: string) {
    return categories.find(c => c.id === categoryId);
  }

  // Add this helper function
  function hasSubcategories(categoryId: string): boolean {
    const category = categories.find(c => c.id === categoryId);
    return !!category?.subcategories?.length;
  }

  // Add this helper function
  function formatBulletPoints(text: string) {
    // Replace bullet points with proper markdown line breaks
    return text.replace(/•/g, '\n•');
  }

</script>

<div class="container">
  <Link to="/" class="back-button">
    <span class="back-icon">←</span>
    Back to all services
  </Link>

  {#if !subId && hasSubcategories(id)}
    <div class="subcategories-section">
      <h2>Choose a category:</h2>
      <div class="subcategories-grid">
        {#each getCategory(id)?.subcategories || [] as subcategory}
          <Link to={`/category/${id}/${subcategory.id}`} class="subcategory-card">
            <div class = "subcategory-card">
              <h3>{subcategory.title}</h3>
              <span class="click-hint">View services →</span>
            </div>
          </Link>
        {/each}
      </div>
    </div>
  {:else}
    {#each categoryResources as resource}
      <div class="resource-card">
        <div class="title-section">
          {#if resource.logo}
            <img src={urlFor(resource.logo).url()} alt={resource.name} />
          {/if}
          <h2>{resource.name}</h2>
        </div>

        <p class="description">{@html marked(formatBulletPoints(resource.description))}</p>

        <!-- Dropdown for Shelter Subcategories -->
        {#if resource.id == 'shelter'}
          <div class="dropdown">
            <button class="dropdown-button" on:click={() => toggleSection(resource.id, 'subcategories')}>
              Subcategories
              <span class="toggle-icon">{$openSections[`${resource.id}-subcategories`] ? '−' : '+'}</span>
            </button>
            {#if $openSections[`${resource.id}-subcategories`]}
              <div class="dropdown-content">
                <Link to="/day-shelter" class="dropdown-link">Day Shelter</Link>
                <Link to="/night-shelter" class="dropdown-link">Night Shelter</Link>
              </div>
            {/if}
          </div>
        {/if}

        {#if resource.operatingHours}
          <div class="accordion-section">
            <button 
              class="accordion-header" 
              on:click={() => toggleSection(resource._id, 'hours')}
              aria-expanded={$openSections[`${resource._id}-hours`]}>
              <span class="section-title">Opening Hours:</span>
              <span class="toggle-icon">{$openSections[`${resource._id}-hours`] ? '−' : '+'}</span>
            </button>
            {#if $openSections[`${resource._id}-hours`]}
              <div class="accordion-content">
                {#each resource.operatingHours as item}
                  <div class="detail-item">
                    <strong>{item.label}:</strong> {item.hours}
                  </div>
                {/each}
              </div>
            {/if}
          </div>
        {/if}


        {#if resource.phoneNumbers || resource.emergencyContacts || resource.email || resource.website || resource.address}
          <div class="accordion-section">
            <button 
              class="accordion-header" 
              on:click={() => toggleSection(resource._id, 'contact')}
              aria-expanded={$openSections[`${resource._id}-contact`]}>
              <span class="section-title">Contact:</span>
              <span class="toggle-icon">{$openSections[`${resource._id}-contact`] ? '−' : '+'}</span>
            </button>
            {#if $openSections[`${resource._id}-contact`]}
              <div class="accordion-content">
                {#if resource.phoneNumbers}
                  <div class="detail-item">
                    <strong>Phone:</strong> 
                    {#each resource.phoneNumbers || [] as phone}
                      <a href={`tel:${phone.number}`}>{phone.number}</a>
                    {/each} 
                  </div>
                {/if}
                {#if resource.emergencyContacts}
                  <div class="detail-item">
                    <strong>Emergency Contacts:</strong> {resource.emergencyContacts.join(', ')}
                  </div>
                {/if}
                {#if resource.email}
                  <div class="detail-item">
                    <strong>Email:</strong> {resource.email}
                  </div>
                {/if}
                {#if resource.website}
                  <div class="detail-item">
                    <strong>Website:</strong> {resource.website}
                  </div>
                {/if}
                {#if resource.address}
                  <div class="detail-item">
                    <strong>Address:</strong> {resource.address.street}
                  </div>
                {/if}
              </div>
            {/if}

          </div>
        {/if}

        {#if resource.needToKnow}
          <div class="accordion-section">
            <button 
              class="accordion-header" 
              on:click={() => toggleSection(resource.id, 'notes')}
              aria-expanded={$openSections[`${resource.id}-notes`]}>
              <span class="section-title">What you need to know:</span>
              <span class="toggle-icon">{$openSections[`${resource.id}-notes`] ? '−' : '+'}</span>
            </button>
            {#if $openSections[`${resource.id}-notes`]}
              <div class="accordion-content">
                {@html marked(formatBulletPoints(resource.needToKnow))}
              </div>
            {/if}
          </div>
        {/if}

        <div class="meta">
          <span>Source: {resource.source}</span>
          <span class="date">Last updated: {new Date(resource._updatedAt).toLocaleString()}</span>
        </div>
      </div>
      
      {#if resource.details?.formEmbedUrl}
        <div class="form-container">
          <iframe
            src={resource.details.formEmbedUrl}
            width="100%"
            height="800px"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
            title="Feedback Form"
          >
            Loading...
          </iframe>
        </div>
      {/if}
    {/each}
  {/if}
</div>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
  }

  .back-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.2rem;
    color: #333;
    padding: 0.5rem 1rem;
    margin-bottom: 2rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    text-decoration: none;
  }

  .back-icon {
    font-size: 1.5rem;
  }

  .resource-card {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    margin-bottom: 1.5rem;
  }

  .title-section {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .icon {
    font-size: 2rem;
  }

  h2 {
    color: #333;
    font-size: 1.5rem;
    margin: 0;
  }

  .description {
    color: #555;
    font-size: 1.1rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;
  }

  /* Dropdown styles */
  .dropdown {
    margin-top: 1rem;
  }

  .dropdown-button {
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 4px;
    width: 100%;
    text-align: left;
  }

  .dropdown-content {
    background-color: #f1f1f1;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 0.5rem;
    padding: 0.5rem;
  }

  .dropdown-link {
    display: block;
    padding: 0.5rem;
    text-decoration: none;
    color: #333;
  }

  .dropdown-link:hover {
    background-color: #ddd; /* Highlight on hover */
  }

  .accordion-section {
    border-bottom: 1px solid #eee;
    margin-bottom: 0.5rem;
  }

  .accordion-header {
    width: 100%;
    padding: 1rem;
    background: none;
    border: none;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    color: #e31837;
    font-weight: 600;
    font-size: 1.1rem;
  }

  .accordion-header:hover {
    background-color: #fff3f5;
  }

  .section-title {
    margin-right: 1rem;
  }

  .toggle-icon {
    font-size: 1.5rem;
    line-height: 1;
  }

  .accordion-content {
    padding: 1rem;
    background: #f9f9f9;
    border-radius: 8px;
    margin-bottom: 1rem;
  }

  .detail-item {
    margin-bottom: 0.5rem;
  }

  .detail-item:last-child {
    margin-bottom: 0;
  }

  .detail-item strong {
    color: #333;
    margin-right: 0.5rem;
  }

  .meta {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
    font-size: 0.9rem;
    color: #666;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }

    .resource-card {
      padding: 1rem;
    }

    h2 {
      font-size: 1.3rem;
    }

    .accordion-header {
      padding: 0.8rem;
      font-size: 1rem;
    }
  }

  .title-section img {
    width: 100px;
    height: auto;
    object-fit: contain;
  }

  .subcategories-section {
    margin: 2rem 0;
  }

  .subcategories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }

  .subcategory-card {
    background: white;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    border: 2px solid transparent;
    transition: all 0.2s;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-decoration: none;
    color: inherit;
  }

  .subcategory-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    background-color: #fff3f5;
  }

  .click-hint {
    display: block;
    margin-top: 0.5rem;
    color: #e31837;
    font-size: 0.9rem;
  }

  /* Add this to ensure proper spacing */
  :global(.description ul) {
    margin: 0;
    padding-left: 20px;
  }
  
  :global(.description li) {
    margin: 0.5rem 0;
  }
</style>
