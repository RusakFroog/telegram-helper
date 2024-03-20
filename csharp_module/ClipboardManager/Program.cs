
namespace ClipboardManager
{
    public static class Program
    {
        private static List<string> _imageFormats = new List<string>
        {
            ".jpg", ".png", ".jpeg", ".tiff"
        };

        [STAThread]
        public static void Main(string[] args)
        {
            if (args.Length == 0)
                return;

            string filePath = args[0];
            string fileName = args[1];

            if (_isImage(fileName))
                Clipboard.SetImage(Image.FromFile(filePath + fileName));
            else
                Clipboard.SetData(DataFormats.FileDrop, Directory.GetFiles(filePath, fileName));
        }

        private static bool _isImage(string fileName) => _imageFormats.Any(f => fileName.EndsWith(f, StringComparison.OrdinalIgnoreCase));
    }
}