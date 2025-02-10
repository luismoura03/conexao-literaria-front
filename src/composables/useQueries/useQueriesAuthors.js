import { computed } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { GET_AUTHORS } from "../../graphql/queries/queriesAuthors/authorsQueries";

export function useAuthors() {
  const { result, loading, error, refetch } = useQuery(GET_AUTHORS, null, {
    fetchPolicy: "network-only",
  });

  const authors = computed(() => result.value?.authors || []);

  const authorsOptions = computed(() =>
    authors.value.map((author) => ({
      label: author.name,
      value: author.id,
    }))
  );

  return { authors, authorsOptions, loading, error, refetch };
}
