export const ThemeScript = () => {
  const script = `
    (function() {
      const savedTheme = localStorage.getItem('theme');

      // Se o tema salvo for 'dark', aplica o tema escuro.
      // Caso contrário (se for 'light' ou nenhum tema estiver salvo),
      // garante que o tema claro seja o padrão.
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark'); // Garante que a classe 'dark' seja removida
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
};
