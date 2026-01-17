<script lang="ts">
import { onMount } from "svelte";
import { getPostUrlBySlug } from "../utils/url-utils";

// Define component properties
export let sortedPosts: Post[] = [];

// Define data structure for posts and year grouping
interface Post {
    slug: string;
    data: {
        title: string;
        tags: string[];
        category?: string;
        published: Date;
    };
}

interface Group {
    year: number;
    posts: Post[];
}

// Store grouped post data
let groups: Group[] = [];

/**
 * Format date to MM-DD format
 * @param date Date object
 * @returns Formatted date string
 */
function formatDate(date: Date) {
    return `${(date.getMonth() + 1).toString().padStart(2, "0")}-${date
        .getDate()
        .toString()
        .padStart(2, "0")}`;
}

/**
 * Format tag array to string format #tag1 #tag2
 * @param tagList Tag array
 * @returns Formatted tag string
 */
function formatTag(tagList: string[]) {
    return tagList?.map((t) => `#${t}`).join(" ") || "";
}

onMount(async () => {
    // Get filter conditions from URL query parameters
    const params = new URLSearchParams(window.location.search);
    const urlTags = params.getAll("tag");
    const urlCategories = params.getAll("category");
    const uncategorized = params.has("uncategorized");

    // Initialize with all posts
    let filteredPosts: Post[] = [...sortedPosts];

    // Filter by tags
    if (urlTags.length > 0) {
        filteredPosts = filteredPosts.filter(
            (post) =>
                Array.isArray(post.data.tags) &&
                urlTags.some((tag) => post.data.tags.includes(tag))
        );
    }

    // Filter by category
    if (urlCategories.length > 0) {
        filteredPosts = filteredPosts.filter(
            (post) => post.data.category && urlCategories.includes(post.data.category)
        );
    }

    // Filter uncategorized posts
    if (uncategorized) {
        filteredPosts = filteredPosts.filter((post) => !post.data.category);
    }

    // Group posts by year
    const grouped = filteredPosts.reduce((acc, post) => {
        const year = post.data.published.getFullYear();
        if (!acc[year]) acc[year] = [];
        acc[year].push(post);
        return acc;
    }, {} as Record<number, Post[]>);

    // Convert grouped object to array and sort by year in descending order
    groups = Object.entries(grouped)
        .map(([year, posts]) => ({
            year: parseInt(year),
            posts,
        }))
        .sort((a, b) => b.year - a.year);
});
</script>

<div class="card-base px-8 py-6">
    <!-- Loop through year groups -->
    {#each groups as group}
        <div>
            <!-- Year title row -->
            <div class="flex flex-row w-full items-center h-[3.75rem]">
                <!-- Year display -->
                <div class="w-[15%] md:w-[10%] transition text-2xl font-bold text-right text-75">
                    {group.year}
                </div>
                
                <!-- Year marker dot -->
                <div class="w-[15%] md:w-[10%]">
                    <div class="h-3 w-3 bg-none rounded-full outline outline-[var(--primary)] mx-auto -outline-offset-[2px] z-50 outline-3"></div>
                </div>
                
                <!-- Post count statistics -->
                <div class="w-[70%] md:w-[80%] transition text-left text-50">
                    {group.posts.length} posts
                </div>
            </div>

            <!-- Post list for current year -->
            {#each group.posts as post}
                <a
                    href={getPostUrlBySlug(post.slug)}
                    aria-label={post.data.title}
                    class="group btn-plain !block h-10 w-full rounded-lg hover:text-[initial]"
                >
                    <div class="flex flex-row justify-start items-center h-full">
                        <!-- Publication date -->
                        <div class="w-[15%] md:w-[10%] transition text-sm text-right text-50">
                            {formatDate(post.data.published)}
                        </div>

                        <!-- Timeline marker -->
                        <div class="w-[15%] md:w-[10%] relative dash-line h-full flex items-center">
                            <div
                                class="transition-all mx-auto w-1 h-1 rounded group-hover:h-5
                                       bg-[oklch(0.5_0.05_var(--hue))] group-hover:bg-[var(--primary)]
                                       outline outline-4 z-50
                                       outline-[var(--card-bg)]
                                       group-hover:outline-[var(--btn-plain-bg-hover)]
                                       group-active:outline-[var(--btn-plain-bg-active)]"
                            ></div>
                        </div>

                        <!-- Post title -->
                        <div
                            class="w-[70%] md:max-w-[65%] md:w-[65%] text-left font-bold
                                   group-hover:translate-x-1 transition-all group-hover:text-[var(--primary)]
                                   text-75 pr-8 whitespace-nowrap overflow-ellipsis overflow-hidden"
                        >
                            {post.data.title}
                        </div>

                        <!-- Post tags (displayed on large screens) -->
                        <div
                            class="hidden md:block md:w-[15%] text-left text-sm transition
                                   whitespace-nowrap overflow-ellipsis overflow-hidden text-30"
                        >
                            {formatTag(post.data.tags)}
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    {/each}
</div>
