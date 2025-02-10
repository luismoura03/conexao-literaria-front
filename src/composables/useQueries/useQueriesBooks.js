import { computed } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { GET_BOOKS } from "../../graphql/queries/queriesBooks/bookQueries";

export function useBooks() {
  const { result, loading, error, refetch } = useQuery(GET_BOOKS, null, {
    fetchPolicy: "network-only",
  });

  const books = computed(() => result.value?.books || []);

  return { books, loading, error, refetch };
}
