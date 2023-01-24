import { Directory } from '../../../type-defs';

export const extractParentDirectory = (input: Directory[]): Directory[] => {
  const finalData: Directory[] = [];

  input.forEach((directory: Directory) => {
    if (directory != null && directory.dir != null) {
      const split: string[] = directory.dir.split('/');
      const parent = '/' + split.slice(1, split.length - 1).join('/');
      finalData.push({
        id: directory.dir,
        dir: split[split.length - 1],
        has_subdirs: directory.has_subdirs,
        parent: parent,
      });
    }
  });

  return finalData;
};
