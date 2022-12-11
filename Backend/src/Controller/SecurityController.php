<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\User;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

use Symfony\Component\HttpFoundation\JsonResponse;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

class SecurityController extends ApiController
{
    private $repository;
    private $JWTManager;
    private $passwordEncoder;

    public function __construct(UserRepository $repository, JWTTokenManagerInterface $JWTManager, UserPasswordHasherInterface $passwordEncoder)
    {
        $this->repository = $repository;
        $this->JWTManager = $JWTManager;
        $this->passwordEncoder = $passwordEncoder;
    }

    #[Route('/api/login', methods: ['POST'])]
    public function login(Request $request)
    {
        $request = $this->transformJsonBody($request);

        $username = $request->get('username');
        $password = $request->get('password');

        $user = $this->repository->getByUsername($username);

        if($user) {
            if(!$this->passwordEncoder->isPasswordValid($user, $password)) {
                return $this->setStatusCode(403)->respondWithMessage('Incorrect password!');
            } 
            return self::getTokenUser($user);
        }

        return $this->setStatusCode(403)->respondWithMessage('Incorrect username!');
    }

    public function getTokenUser(User $user): JsonResponse
    {
        $payload = array_merge(['id' => $user->getId()], ['name' => $user->getName()], ['surname' => $user->getSurname()], ['email' => $user->getEmail()], ['role' => $user->getRole()]);
        return new JsonResponse(['token' => $this->JWTManager->createFromPayload($user, $payload)]);
    }
}
