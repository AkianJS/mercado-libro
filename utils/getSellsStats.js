import fetchSetter from "./fetchSetter";

export async function getSellsStats() {
  const SELLS_STATS = `
    query
{
  getEstadisticas {
    message
    status
    success
    ventasDia
    {
      fechaventas
      ventas
    },
    ventasMes
    {
      fechaventas
      ventas
    }
  }
}`;

  const data = await fetchSetter(SELLS_STATS);
  return data;
}
