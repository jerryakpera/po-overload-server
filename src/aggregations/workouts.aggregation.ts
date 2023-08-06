export const Workout = (query: object) => {
  return [
    {
      $match: query,
    },
    {
      $group: {
        _id: '$exerciseId',
        workouts: {
          $push: '$$ROOT',
        },
      },
    },
    {
      $set: {
        _id: '$_id',
        exerciseId: {
          $first: '$workouts.exerciseId',
        },
      },
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
        exercise: {
          $first: '$exercise',
        },
        name: {
          $first: '$exercise.name',
        },
        gifUrl: {
          $first: '$exercise.gifUrl',
        },
        target: {
          $first: '$exercise.target',
        },
        bodyPart: {
          $first: '$exercise.bodyPart',
        },
        equipment: {
          $first: '$exercise.equipment',
        },
        createdAt: {
          $first: '$exercise.createdAt',
        },
        updatedAt: {
          $first: '$exercise.updatedAt',
        },
        demonstration: {
          $first: '$exercise.demonstration',
        },
      },
    },
    {
      $project: {
        sortedWorkouts: {
          $sortArray: {
            input: '$workouts',
            sortBy: {
              createdAt: -1,
            },
          },
        },
        workouts: 1,
        name: 1,
        gifUrl: 1,
        target: 1,
        bodyPart: 1,
        equipment: 1,
        createdAt: 1,
        updatedAt: 1,
        demonstration: 1,
      },
    },
    {
      $unwind: {
        path: '$workouts',
      },
    },
    {
      $group: {
        _id: '$_id',
        averagePO: {
          $avg: '$workouts.progressive_overload',
        },
        maxPO: {
          $max: '$workouts.progressive_overload',
        },
        minPO: {
          $min: '$workouts.progressive_overload',
        },
        workouts: {
          $push: '$workouts',
        },
        sortedWorkouts: {
          $first: '$sortedWorkouts',
        },
        name: {
          $first: '$name',
        },
        gifUrl: {
          $first: '$gifUrl',
        },
        target: {
          $first: '$target',
        },
        bodyPart: {
          $first: '$bodyPart',
        },
        equipment: {
          $first: '$equipment',
        },
        createdAt: {
          $first: '$createdAt',
        },
        updatedAt: {
          $first: '$updatedAt',
        },
        demonstration: {
          $first: '$demonstration',
        },
      },
    },
    {
      $sort: {
        'workouts.createdAt': -1,
      },
    },
  ];
};
