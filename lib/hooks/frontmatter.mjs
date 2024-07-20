/* eslint-disable import/no-extraneous-dependencies */
import { promises } from 'fs';
import matter from 'gray-matter';

const updateFrontmatter = async () => {
  const [, , ...mdFilePaths] = process.argv;

  mdFilePaths.forEach(async (path) => {
    console.log(`Updating frontmatter for ${path}`);
    const file = matter.read(path);
    const { data: currentFrontmatter } = file;

    if (currentFrontmatter.published === true) {
      const updatedFrontmatter = {
        ...currentFrontmatter,
        updatedOn: new Date().toISOString(),
      };

      file.data = updatedFrontmatter;

      const updatedFileContent = matter.stringify(file);
      promises.writeFile(path, updatedFileContent);
    }
  });
};

updateFrontmatter();
