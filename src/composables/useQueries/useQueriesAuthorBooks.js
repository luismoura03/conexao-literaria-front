import { useQuery } from "@vue/apollo-composable";
import { GET_AUTHOR_BOOKS } from "../../graphql/queries/queriesAuthors/authorsBooks.js";
import { computed } from "vue";

export function useAuthorsBooks(authorId) {
  const isEnabled = computed(() => !!authorId);

  const { result, loading, error, refetch } = useQuery(GET_AUTHOR_BOOKS, { authorId }, {
    fetchPolicy: "network-only",
    enabled: isEnabled,
  });

  const books = computed(() => result.value?.author?.books || []);

  return { books, loading, error, refetch, isEnabled };
}