export const Exercise = (query: object) => {
  return [
    {
      $match: query,
    },
    {
      $lookup: {
        from: 'workouts',
        localField: '_id',
        foreignField: 'exerciseId',
        as: 'workouts',
      },
    },
    {
      $project: {
        _id: 1,
        Category: 1,
        Difficulty: 1,
        id: 1,
        exercise_name: 1,
        steps: 1,
        target: 1,
        youtubeURL: 1,
        workouts: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
  ];
};
