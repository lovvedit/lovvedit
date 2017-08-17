import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import User from '../components/users/models';

const { JWT_SECRET } = process.env;

export default function configurePassport(passport) {
  const options = {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  passport.use(
    new JwtStrategy(options, async ({ sub }, done) => {
      try {
        const user = await User.findOne({ _id: sub });
        done(null, user || null);
      } catch (err) {
        done(err);
      }
    }),
  );
}
