import { useQuery } from "@vue/apollo-composable";
import { GET_AUTHOR_BOOKS } from "../../graphql/queries/queriesAuthors/authorsBooks.js";
import { computed } from "vue";

export function useAuthorsBooks(authorName) {
  const isEnabled = computed(() => !!authorName);

  const { result, loading, error, refetch } = useQuery(GET_AUTHOR_BOOKS, { name:authorName }, {
    fetchPolicy: "network-only",
    enabled: isEnabled,
  });

  const author = computed(() => result.value?.author || null)
  const books = computed(() => result.value?.author?.books || []);

  return { books, author, loading, error, refetch, isEnabled };
}