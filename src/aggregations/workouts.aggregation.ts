export const Workout = (query: object) => {
  return [
    {
      $match: query,
    },
    {
      $lookup: {
        from: 'exercises',
        localField: 'exerciseId',
        foreignField: '_id',
        as: 'exercise',
      },
    },
    {
      $set: {
        exercise: { $first: '$exercise' },
      },
    },
    {
      $project: {
        _id: 1,
        exercise: 1,
        uid: 1,
        exerciseId: 1,
        sets: 1,
        progression: 1,
        progressive_overload: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
  ];
};
