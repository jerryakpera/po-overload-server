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
        id: 1,
        _id: 1,
        name: 1,
        target: 1,
        gifUrl: 1,
        bodyPart: 1,
        workouts: 1,
        equipment: 1,
        createdAt: 1,
        updatedAt: 1,
        demonstration: 1,
      },
    },
  ];
};
