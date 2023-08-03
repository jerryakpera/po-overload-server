export const ExercisesWorkout = (query: object, uid: string = '') => {
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
        name: 1,
        id: 1,
        demonstration: 1,
        target: 1,
        bodyPart: 1,
        equipment: 1,
        workouts: {
          $filter: {
            input: '$workouts',
            as: 'workout',
            cond: { $eq: ['$$workout.uid', uid] },
          },
        },
      },
    },
  ];
};
