export default interface Task {
    title: string | null,
    description: string | null,
    loading: boolean,
    status: string,
    userId: string | null
  };